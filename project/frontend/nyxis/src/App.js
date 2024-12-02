import './App.css';
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./OtherComponents/NavBar";
import NotFound from "./OtherComponents/NotFound";
import Homepage from "./OtherComponents/Homepage";
import SignupForm from "./Forms/SignupForm";
import LoginForm from "./Forms/LoginForm";
import UserContext from "./OtherComponents/UserContext";
import { jwtDecode } from "jwt-decode";
import NyxisApi from "./api.js";
import FilteredProducts from "./ProductsComponents/FilteredProducts";
import BannerCarousel from "./Banners/BannerCarousel";
import TagsButtonComponent from "./OtherComponents/TagsButtonComponent";
import Shop from "./ProductsComponents/Shop";
import CartModal from './OtherComponents/CartModal';
import ProductsList from "./ProductsComponents/ProductsList";
import ProductDetail from "./ProductsComponents/ProductDetail";
import FavoritesPage from "./OtherComponents/FavoritesModal";
import Footer from "./OtherComponents/Footer";
import ParentComponent from "./OtherComponents/ParentComponent";
import SuccessPage from "./OtherComponents/SuccessPage";
import CancelPage from "./OtherComponents/CancelPage";

import FavoritesModal from "./OtherComponents/FavoritesModal";


function App() {
  const [token, setToken] = useState(localStorage.getItem("nyxis-token") || null);
  const [currentUser, setCurrentUser] = useState(() => {
    const storedUser = localStorage.getItem("currentUser");
    return storedUser ? JSON.parse(storedUser) : null;

  });  const [isModalOpen, setModalOpen] = useState(false);


  // const [cart, setCart] = useState(() => {
  //   const savedCart = localStorage.getItem('cart');
  //   return savedCart ? JSON.parse(savedCart) : [];
  // });
  //
  // const [favorites, setFavorites] = useState(() => {
  //   const savedFavorites = localStorage.getItem('favorites');
  //   return savedFavorites ? JSON.parse(savedFavorites) : [];
  // });

  const [cart, setCart] = useState(() => {
    const savedCart = currentUser
        ? JSON.parse(localStorage.getItem(`${currentUser.username}-cart`)) || []
        : JSON.parse(sessionStorage.getItem("cart")) || [];
    return savedCart;
  });


  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = currentUser
        ? JSON.parse(localStorage.getItem(`${currentUser.username}-favorites`))
        : JSON.parse(sessionStorage.getItem('favorites'));
    return savedFavorites || [];
  });



// Initialize cart and favorites based on user or session
  useEffect(() => {
    if (currentUser) {
      const userCart = JSON.parse(localStorage.getItem(`${currentUser.username}-cart`)) || [];
      const userFavorites = JSON.parse(localStorage.getItem(`${currentUser.username}-favorites`)) || [];
      setCart(userCart);
      setFavorites(userFavorites);
      console.log("Cart and favorites restored after login:", { userCart, userFavorites });
    } else {
      const sessionCart = JSON.parse(sessionStorage.getItem("cart")) || [];
      const sessionFavorites = JSON.parse(sessionStorage.getItem("favorites")) || [];
      setCart(sessionCart);
      setFavorites(sessionFavorites);
    }
  }, [currentUser]);



  // Persist cart to localStorage or sessionStorage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(`${currentUser.username}-cart`, JSON.stringify(cart));
      localStorage.setItem(`${currentUser.username}-favorites`, JSON.stringify(favorites));
      console.log(`Persisted cart and favorites for ${currentUser.username}`);
    }
  }, [cart, favorites, currentUser]);


  // Load user info when token changes
  useEffect(() => {
    async function loadUserInfo() {
      if (token) {
        try {
          const { username } = jwtDecode(token); // Decode username from token
          NyxisApi.token = token; // Set token for API requests
          const user = await NyxisApi.getCurrentUser(username); // Fetch user details
          setCurrentUser(user); // Update user state
          localStorage.setItem("currentUser", JSON.stringify(user)); // Store user in localStorage

          // Restore cart and favorites for logged-in user
          const userCart = JSON.parse(localStorage.getItem(`${username}-cart`)) || [];
          const userFavorites = JSON.parse(localStorage.getItem(`${username}-favorites`)) || [];
          setCart(userCart);
          setFavorites(userFavorites);
          console.log("Cart and favorites restored after login:", { userCart, userFavorites });
        } catch (err) {
          console.error("Error loading user info:", err);
          setCurrentUser(null);
          localStorage.removeItem("currentUser");
        }
      }
    }
    loadUserInfo();
  }, [token]);



  const [cartOpen, setCartOpen] = useState(false); // Cart modal state
  const [favoritesOpen, setFavoritesOpen] = useState(false); // Favorites modal state


  // Toggle functions
  const toggleCartOpen = () => setCartOpen(!cartOpen);
  const toggleFavoritesOpen = () => setFavoritesOpen(!favoritesOpen);




  // When the token changes, we reload user info from API
  useEffect(() => {
    async function loadUserInfo() {
      if (token) {
        try {
          let { username } = jwtDecode(token);  // Decode token to get username
          NyxisApi.token = token;  // Set token for API requests
          let currentUser = await NyxisApi.getCurrentUser(username);  // Fetch user details
          setCurrentUser(currentUser);  // Set the user data
          localStorage.setItem("currentUser", JSON.stringify(currentUser));  // Store user in localStorage
        } catch (err) {
          setCurrentUser(null);
          localStorage.removeItem("currentUser");
        }
      }
    }
    loadUserInfo();
  }, [token]);






  const addToCart = (product, quantity) => {
    const updatedCart = [...cart];
    const existingItemIndex = updatedCart.findIndex(item => item.id === product.id);

    if (existingItemIndex >= 0) {
      updatedCart[existingItemIndex].quantity += quantity;
    } else {
      updatedCart.push({ ...product, quantity });
    }

    setCart(updatedCart);
    if (currentUser) {
      localStorage.setItem(`${currentUser.username}-cart`, JSON.stringify(updatedCart));
    } else {
      sessionStorage.setItem("cart", JSON.stringify(updatedCart));
    }
    console.log("Updated cart:", updatedCart);

  };



  const toggleFavorite = (product) => {
    setFavorites(prevFavorites => {
      const isFavorite = prevFavorites.some(fav => fav.id === product.id);
      return isFavorite
          ? prevFavorites.filter(fav => fav.id !== product.id)
          : [...prevFavorites, product];
    });
  };




  async function signup(signupData) {
    try {
      const result = await NyxisApi.signup(signupData);
      if (result.success) {
        setToken(result.token);
        localStorage.setItem("nyxis-token", result.token); // Save token to localStorage
        return { success: true };
      }
    } catch (err) {
      console.error("Signup failed", err);
      return { success: false, errors: err };
    }
  }


// // Define the login function
//   async function login(loginData) {
//     try {
//       const token = await NyxisApi.login(loginData); // Fetch token from API
//       console.log("Token received from backend:", token);
//
//       setToken(token);
//
//       localStorage.setItem("nyxis-token", token);
//       return { success: true };
//     } catch (errors) {
//       console.error("Login failed", errors);
//       return { success: false, errors };
//     }
//   }

  async function login(loginData) {
    try {
      const token = await NyxisApi.login(loginData); // Fetch token from API
      if (token) {
        setToken(token); // Update token state
        localStorage.setItem("nyxis-token", token); // Save token to localStorage
        console.log("Token set in localStorage:", token);
        return { success: true, token };
      } else {
        console.error("No token received from backend");
        return { success: false, errors: ["No token received"] };
      }
    } catch (err) {
      console.error("Login failed", err);
      return { success: false, errors: err };
    }
  }


  // function logout() {
  //   setToken(null);
  //   setCurrentUser(null);
  //   localStorage.removeItem("nyxis-token");
  //   localStorage.removeItem("currentUser");
  //
  // }

  function logout() {
    setToken(null);
    setCurrentUser(null);
    setCart([]); // Clear the cart state
    setFavorites([]); // Clear the favorites state
    localStorage.removeItem("nyxis-token");
    localStorage.removeItem("currentUser");

    // Persist user-specific cart and favorites in localStorage
    console.log("User logged out, cart and favorites cleared from state but persisted in localStorage.");
  }







  return (
      <div className="App">
        <BrowserRouter>
          <UserContext.Provider value={{ currentUser, setCurrentUser }}>
            <NavBar
                logout={logout}
                cart={cart}
                toggleCartOpen={toggleCartOpen}
                favorites={favorites}
                toggleFavoritesOpen={toggleFavoritesOpen} // Pass toggleFavoritesOpen
            />
            {cartOpen && <CartModal cart={cart} setCart={setCart} toggleCartOpen={toggleCartOpen} />}
            {favoritesOpen && (
                <FavoritesModal
                    favorites={favorites}
                    toggleFavorite={toggleFavorite}
                    toggleFavoritesOpen={toggleFavoritesOpen} // Pass toggleFavoritesOpen
                    addToCart={addToCart}
                />
            )}
            <BannerCarousel />
            <TagsButtonComponent />
            <div className="app-container">
              <main className="main-content">
                <Routes>
                  <Route path="/" element={<Homepage />} />
                  <Route path="/signup" element={<SignupForm signup={signup} />} />
                  <Route path="/login" element={<LoginForm login={login} />} />
                  <Route path="/success" element={<SuccessPage />} />
                  <Route path="/cancel" element={<CancelPage />} />

                  <Route path="/makeup" element={<ProductsList favorites={favorites} toggleFavorite={toggleFavorite} isFavorite={false} addToCart={addToCart}  />} />
                  <Route path="/makeup/tag/:tag" element={<FilteredProducts favorites={favorites} toggleFavorite={toggleFavorite} isFavorite={false} addToCart={addToCart} filterType="tag" />} />
                  <Route path="/makeup/product_type/:product_type" element={<FilteredProducts favorites={favorites} toggleFavorite={toggleFavorite} isFavorite={false} addToCart={addToCart} filterType="product_type" />} />
                  <Route path="makeup/brands/:brand" element={<FilteredProducts favorites={favorites} toggleFavorite={toggleFavorite} addToCart={addToCart} isFavorite={false} filterType="brand" />} />
                  <Route path="/products/:productId" element={<ProductDetail favorites={favorites} toggleFavorite={toggleFavorite} isFavorite={false} addToCart={addToCart} />} />
                  <Route path="/" element={<ParentComponent />} />


                  <Route path="/cart" element={<Shop cart={cart} setCart={setCart} favorites={favorites} toggleFavorite={toggleFavorite} />} />
                  <Route path="/favorites" element={<FavoritesPage favorites={favorites} toggleFavorite={toggleFavorite} isFavorite={true} addToCart={addToCart}/>} />

                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </div>
          </UserContext.Provider>
          <Footer />
        </BrowserRouter>
      </div>
  );
}

export default App;
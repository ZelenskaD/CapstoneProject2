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
import loadingGif from "./OtherComponents/images/loading.gif";

function App() {
  const [token, setToken] = useState(localStorage.getItem("nyxis-token") || null);
  const [currentUser, setCurrentUser] = useState(() => {
    const storedUser = localStorage.getItem("currentUser");
    return storedUser ? JSON.parse(storedUser) : null;

  });

  const [isModalOpen, setModalOpen] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

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
    }
    else {
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
        } catch (err) {
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
    // setIsLoading(true); // Start loading

    try {
      const result = await NyxisApi.signup(signupData); // API call
      if (result.success) {
        setToken(result.token);
        localStorage.setItem("nyxis-token", result.token); // Save token to localStorage
        return { success: true }; // Return success immediately
      } else {
        // Ensure loading stops before returning errors
        // setIsLoading(false);
        return { success: false, errors: result.errors }; // Return errors from API
      }
    } catch (err) {
      // Handle unexpected errors
      // setIsLoading(false);
      return { success: false, errors: ["An unexpected error occurred. Please try again."] };
    // } finally {
      // Ensure loading is always stopped
      // setIsLoading(false);
    }
  }





  async function login(loginData) {
    try {
      setIsLoading(true); // Start loading

      const token = await NyxisApi.login(loginData); // Fetch token from API
      if (token) {
        setToken(token); // Update token state
        localStorage.setItem("nyxis-token", token); // Save token to localStorage
        setTimeout(() => {
          setIsLoading(false); // End loading after 3 seconds
        }, 1000);
        return { success: true, token };
      } else {
        setIsLoading(false);

        return { success: false, errors: ["No token received"] };
      }
    } catch (err) {
      setIsLoading(false);

      return { success: false, errors: err };
    }
  }



  function logout() {
    // Clear authentication-related data
    setToken(null);
    setCurrentUser(null);

    // Clear state data for cart and favorites
    setCart([]);
    setFavorites([]);

    // Remove global user authentication data from localStorage
    localStorage.removeItem("nyxis-token");
    localStorage.removeItem("currentUser");

    // Optional: Clear session data if used
    sessionStorage.clear();

  }

  useEffect(() => {
    // Simulate a 3-second delay
    const timer = setTimeout(() => {
      setIsLoading(false); // Hide loading screen after 3 seconds
    }, 3000);

    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, []);

  if (isLoading) {
    return (
        <div className="loading-container">
          <img
              src={loadingGif}
              alt="Loading..."
              className="loading-image"
          />
          <h2>Loading, please wait...</h2>
        </div>
    );
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
                  <Route path="/signup" element={<SignupForm signup={signup} setLoading={setIsLoading}/>} />
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
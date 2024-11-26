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
import ButtonsComponent from "./OtherComponents/ButtonsComponent";
import TagsButtonComponent from "./OtherComponents/TagsButtonComponent";
import Shop from "./ProductsComponents/Shop";
import CartModal from './OtherComponents/CartModal';
import ProductsList from "./ProductsComponents/ProductsList";
import ProductDetail from "./ProductsComponents/ProductDetail";
import FavoritesPage from "./OtherComponents/FavoritesModal";
import Footer from "./OtherComponents/Footer";
import ParentComponent from "./OtherComponents/ParentComponent";

import ProfileForm from "./UserComponents/ProfileForm";
import FavoritesModal from "./OtherComponents/FavoritesModal"; // Import FavoritesModal

function App() {
  const [token, setToken] = useState(localStorage.getItem("nyxis-token") || null);
  const [currentUser, setCurrentUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

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
          let { username } = jwtDecode(token);
          console.log("Decoded username:", username);
          NyxisApi.token = token;
          let currentUser = await NyxisApi.getCurrentUser(username);
          setCurrentUser(currentUser);
          localStorage.setItem("currentUser", JSON.stringify(currentUser));
        } catch (err) {
          console.error("Error loading user info:", err);
          setCurrentUser(null);
          localStorage.removeItem("currentUser");
        }
      }
    }
    loadUserInfo();
  }, [token]);






  // useEffect(() => {
  //   localStorage.setItem('favorites', JSON.stringify(favorites));
  // }, [favorites]);

  //
  const addToCart = (product, quantity) => {
    const updatedCart = [...cart];
    const existingItemIndex = updatedCart.findIndex(item => item.id === product.id);

    if (existingItemIndex >= 0) {
      updatedCart[existingItemIndex].quantity += quantity;
    } else {
      updatedCart.push({ ...product, quantity });
    }

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const toggleFavorite = (product) => {
    setFavorites(favorites => {
      const isFavorite = favorites.some(fav => fav.id === product.id);
      const updatedFavorites = isFavorite
          ? favorites.filter(fav => fav.id !== product.id) // Remove from favorites
          : [...favorites, product]; // Add to favorites

      localStorage.setItem('favorites', JSON.stringify(updatedFavorites)); // Update localStorage
      return updatedFavorites;
    });
  };


  const handleSearch = (query) => {
    setSearchTerm(query);
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


// Define the login function
  async function login(loginData) {
    try {
      const token = await NyxisApi.login(loginData);
      setToken(token);
      localStorage.setItem("nyxis-token", token);
      return { success: true };
    } catch (errors) {
      console.error("Login failed", errors);
      return { success: false, errors };
    }
  }

  function logout() {
    setToken(null);
    setCurrentUser(null);
    localStorage.removeItem("nyxis-token");
    localStorage.removeItem("currentUser");
  }



  return (
      <div className="App">
        <BrowserRouter>
          <UserContext.Provider value={{ currentUser, setCurrentUser }}>
            <NavBar
                logout={logout}
                cart={cart}
                toggleCartOpen={toggleCartOpen}
                onSearch={handleSearch}
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
                  <Route path="/profile" element={<ProfileForm  />} />
                  <Route path="/makeup" element={<ProductsList favorites={favorites} toggleFavorite={toggleFavorite} isFavorite={false} addToCart={addToCart} searchTerm={searchTerm} />} />
                  <Route path="/makeup/tag/:tag" element={<FilteredProducts favorites={favorites} toggleFavorite={toggleFavorite} isFavorite={false} addToCart={addToCart} filterType="tag" />} />
                  <Route path="/makeup/product_type/:product_type" element={<FilteredProducts favorites={favorites} toggleFavorite={toggleFavorite} isFavorite={false} addToCart={addToCart} filterType="product_type" />} />
                  <Route path="makeup/brands/:brand" element={<FilteredProducts favorites={favorites} toggleFavorite={toggleFavorite} addToCart={addToCart} isFavorite={false} filterType="brand" />} />
                  <Route path="/cart" element={<Shop cart={cart} setCart={setCart} favorites={favorites} toggleFavorite={toggleFavorite} />} />
                  <Route path="/products/:productId" element={<ProductDetail favorites={favorites} toggleFavorite={toggleFavorite} isFavorite={false} addToCart={addToCart} />} />
                  <Route path="/" element={<ParentComponent />} />

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
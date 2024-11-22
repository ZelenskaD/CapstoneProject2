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
import FavoritesPage from "./OtherComponents/FavoritesPage";
import Footer from "./OtherComponents/Footer";

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

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);


  const [cartOpen, setCartOpen] = useState(false); // Cart modal state

  const toggleCartOpen = () => setCartOpen(!cartOpen);

// Define the addToCart function
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



  // Define the logout function
  function logout() {
    setToken(null);
    setCurrentUser(null);
    localStorage.removeItem("nyxis-token");
    localStorage.removeItem("currentUser");
  }

  // Define the signup function
  async function signup(signupData) {
    try {
      const token = await NyxisApi.signup(signupData);
      setToken(token);
      localStorage.setItem("nyxis-token", token);
      return { success: true };
    } catch (errors) {
      console.error("Signup failed", errors);
      return { success: false, errors };
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

  useEffect(() => {
    async function loadUserInfo() {
      if (token) {
        try {
          let { username } = jwtDecode(token);
          NyxisApi.token = token;
          let currentUser = await NyxisApi.getCurrentUser(username);
          setCurrentUser(currentUser);
          localStorage.setItem("currentUser", JSON.stringify(currentUser));
        } catch (err) {
          setCurrentUser(null);
          localStorage.removeItem("currentUser");
        }
      }
    }
    loadUserInfo();
  }, [token]);

  // Handler for search
  const handleSearch = (query) => {
    setSearchTerm(query);
  };

  return (
      <div className="App">
        <BrowserRouter>
          <UserContext.Provider value={{ currentUser, setCurrentUser }}>
            <NavBar logout={logout} cart={cart} toggleCartOpen={toggleCartOpen} onSearch={handleSearch} />
            {cartOpen && <CartModal cart={cart} setCart={setCart} toggleCartOpen={toggleCartOpen} />}
            <BannerCarousel />
            {/*<ButtonsComponent />*/}
            <TagsButtonComponent />
            <div className="app-container">
              <div className="main-content">
                <main>
                  <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/signup" element={<SignupForm signup={signup} />} />
                    <Route path="/login" element={<LoginForm login={login} />} />
                    <Route path="/makeup" element={<ProductsList favorites={favorites} toggleFavorite={toggleFavorite}
                                                                 isFavorite={false} addToCart={addToCart} searchTerm={searchTerm} />} />
                    <Route path="/makeup/tag/:tag" element={<FilteredProducts favorites={favorites} toggleFavorite={toggleFavorite} isFavorite={false} addToCart={addToCart} filterType="tag" />} />
                    <Route path="/makeup/product_type/:product_type" element={<FilteredProducts favorites={favorites} toggleFavorite={toggleFavorite} isFavorite={false} addToCart={addToCart} filterType="product_type" />} />
                    <Route path="makeup/brands/:brand" element={<FilteredProducts  favorites={favorites} toggleFavorite={toggleFavorite} addToCart={addToCart} isFavorite={false} filterType="brand" />} />
                    <Route path="/cart" element={<Shop cart={cart} setCart={setCart} favorites={favorites} toggleFavorite={toggleFavorite}/>} />
                    <Route path="/products/:productId" element={<ProductDetail favorites={favorites} toggleFavorite={toggleFavorite} isFavorite={false} addToCart={addToCart} />} />
                    <Route path="/favorites" element={<FavoritesPage favorites={favorites} toggleFavorite={toggleFavorite} isFavorite={true} addToCart={addToCart} />} />

                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
              </div>
            </div>
          </UserContext.Provider>
          <Footer />
        </BrowserRouter>
      </div>
  );
}

export default App;



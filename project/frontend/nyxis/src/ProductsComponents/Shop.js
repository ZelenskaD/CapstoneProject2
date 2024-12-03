import React, { useState, useEffect, useContext } from 'react';
import NavBar from '../OtherComponents/NavBar';
import ProductsPage from './ProductsPage';
import FavoritesModal from '../OtherComponents/FavoritesModal';
import UserContext from '../OtherComponents/UserContext';



const Shop = () => {
    const { currentUser } = useContext(UserContext); // Access current user from context



    const [favorites, setFavorites] = useState([]);
    const [cart, setCart] = useState([]);
    const [isFavoritesOpen, setIsFavoritesOpen] = useState(false); // Modal state

    useEffect(() => {
        if (currentUser) {
            const userCart = JSON.parse(localStorage.getItem(`${currentUser.username}-cart`)) || [];
            setCart(userCart);
            console.log(`Cart restored for ${currentUser.username}:`, userCart);
        } else {
            setCart([]);
        }
    }, [currentUser]);

    useEffect(() => {
        console.log("Cart in Parent:", cart);
    }, [cart]);


    // Load user-specific cart and favorites from localStorage
    useEffect(() => {
        if (currentUser) {
            const savedCart = localStorage.getItem(`${currentUser.username}-cart`);
            const savedFavorites = localStorage.getItem(`${currentUser.username}-favorites`);
            setCart(savedCart ? JSON.parse(savedCart) : []);
            setFavorites(savedFavorites ? JSON.parse(savedFavorites) : []);
        } else {
            setCart([]);
            setFavorites([]);
        }
    }, [currentUser]);

    // Persist user-specific cart and favorites to localStorage
    useEffect(() => {
        if (currentUser) {
            localStorage.setItem(`${currentUser.username}-cart`, JSON.stringify(cart));
            localStorage.setItem(`${currentUser.username}-favorites`, JSON.stringify(favorites));
        }
    }, [cart, favorites, currentUser]);


    const toggleFavoritesOpen = () => {
        setIsFavoritesOpen(!isFavoritesOpen);
    };


    const addToCart = (product, quantity) => {
        const updatedCart = [...cart];
        const existingItemIndex = updatedCart.findIndex(item => item.id === product.id);

        if (existingItemIndex >= 0) {
            updatedCart[existingItemIndex].quantity += quantity;
        } else {
            updatedCart.push({ ...product, quantity });
        }

        setCart(updatedCart);
    };


    const toggleFavorite = (product) => {
        setFavorites(favorites =>
            favorites.some(fav => fav.id === product.id)
                ? favorites.filter(fav => fav.id !== product.id)  // Remove from favorites
                : [...favorites, product]  // Add to favorites
        );
    };

    return (
        <>
            <NavBar
                logout={() => {}}
                cart={cart}
                toggleCartOpen={() => {}}
                favorites={favorites}
                toggleFavoritesOpen={toggleFavoritesOpen}
            />
            <ProductsPage
                addToCart={addToCart}
                toggleFavorite={toggleFavorite}
                favorites={favorites}
            />
            {isFavoritesOpen && (
                <FavoritesModal
                    favorites={favorites}
                    toggleFavorite={toggleFavorite}
                    toggleFavoritesOpen={toggleFavoritesOpen}
                />
            )}
        </>
    );
};

export default Shop;

















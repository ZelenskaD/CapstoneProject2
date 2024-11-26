import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../OtherComponents/NavBar';
import ProductsPage from './ProductsPage';
import FavoritesModal from '../OtherComponents/FavoritesModal';

const Shop = () => {
    const [favorites, setFavorites] = useState(() => {
        const savedFavorites = localStorage.getItem('favorites');
        return savedFavorites ? JSON.parse(savedFavorites) : [];
    });

    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    const [isFavoritesOpen, setIsFavoritesOpen] = useState(false); // Modal state

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
        localStorage.setItem("cart", JSON.stringify(updatedCart)); // Save to localStorage
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

















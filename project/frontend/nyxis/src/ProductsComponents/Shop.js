import React, { useState, useEffect } from 'react';
import ProductsPage from './ProductsPage';

const Shop = () => {
    const [favorites, setFavorites] = useState(() => {
        const savedFavorites = localStorage.getItem('favorites');
        return savedFavorites ? JSON.parse(savedFavorites) : [];
    });


    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);



    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);





    const addToCart = (product, quantity) => {
        const existingItem = cart.find(item => item.id === product.id);
        if (existingItem) {
            setCart(cart.map(item =>
                item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
            ));
        } else {
            setCart([...cart, { ...product, quantity }]);
        }
    };

    const toggleFavorite = (product) => {
        setFavorites(favorites =>
            favorites.some(fav => fav.id === product.id)
                ? favorites.filter(fav => fav.id !== product.id)  // Remove from favorites
                : [...favorites, product]  // Add to favorites
        );
    };


    return (
        <ProductsPage
            addToCart={addToCart}
            toggleFavorite={toggleFavorite}
            favorites={favorites}
            isFavorite={false}
        />
    );
};

export default Shop;















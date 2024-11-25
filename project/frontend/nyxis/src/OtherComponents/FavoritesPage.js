import React from 'react';
import ProductCard from '../ProductsComponents/ProductCard';
import "../Styles/FavoritesPage.css"

const FavoritesPage = ({ favorites, toggleFavorite, addToCart }) => {
    if (favorites.length === 0) {
        return <p>You have no favorite products.</p>;
    }

    return (
        <div className="favorites-list">
            {favorites.map(product => (
                <ProductCard
                    key={product.id}
                    product={product}
                    addToCart={addToCart}
                    toggleFavorite={toggleFavorite}
                    isFavorite={true}
                    favoritePage={true} // Explicitly set the prop
                />
            ))}
        </div>
    );
};

export default FavoritesPage;




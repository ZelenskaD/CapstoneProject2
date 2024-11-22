import React from 'react';
import ProductCard from '../ProductsComponents/ProductCard';

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
                    isFavorite={true} // All products here are favorites
                />
            ))}
        </div>
    );
};

export default FavoritesPage;

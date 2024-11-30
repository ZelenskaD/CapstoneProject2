import React from 'react';
import ProductsList from './ProductsList';



function ProductsPage({ addToCart, toggleFavorite, favorites }) {

    return (
        <div>

            <ProductsList
                addToCart={addToCart}
                toggleFavorite={toggleFavorite}
                favorites={favorites}
                isFavorite={false}
            />
        </div>
    );
}

export default ProductsPage;
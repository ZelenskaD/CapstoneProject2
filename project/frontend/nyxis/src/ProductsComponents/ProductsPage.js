import React from 'react';
import ProductsList from './ProductsList';
import ButtonsComponent from "../OtherComponents/ButtonsComponent";
import TagsButtonComponent from "../OtherComponents/TagsButtonComponent";


function ProductsPage({ addToCart, toggleFavorite, favorites }) {

    return (
        <div>
            {/*<ButtonsComponent />*/}
            {/* <TagsButtonComponent />*/}
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
import React from "react";
import { useNavigate } from "react-router-dom";
import FavoritesModal from "./FavoritesModal";

const ParentComponent = ({ favorites, toggleFavorite, toggleFavoritesOpen}) => {
    const navigate = useNavigate();

    // Navigate to product detail page
    const handleProductClick = (productId) => {
        navigate(`/products/${productId}`);
    };

    return (
        <FavoritesModal
            favorites={favorites}
            toggleFavorite={toggleFavorite}
            toggleFavoritesOpen={toggleFavoritesOpen}
            onProductClick={handleProductClick} // Pass the function
        />
    );
};

export default ParentComponent;







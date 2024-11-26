import React from 'react';
import { Link } from 'react-router-dom';
import "../Styles/FavoritesModal.css";

import defaultImage from './nyxisdefault.jpg'; // Ensure the path is correct

const FavoritesModal = ({ favorites = [],toggleFavoritesOpen }) => {

    return (
        <div className="favorites-modal">
            {/* Modal Header */}
            <div className="modal-header">
                <h2>Your Favorites</h2>

            </div>

            {/* Favorites List */}
            <ul className="favorites-items">
                {favorites.length > 0 ? (
                    favorites.map((product) => (
                        <li key={product.id} className="favorites-item">
                            {/* Product Image with Link */}
                            <div className="item-image">
                                <Link to={`/products/${product.id}`}>
                                    <img
                                        src={product.image_link || defaultImage} // Use defaultImage if no image_link
                                        alt={product.name}
                                        onError={(e) => {
                                            e.target.onerror = null; // Prevent infinite loop in case defaultImage also fails
                                            e.target.src = defaultImage; // Set to defaultImage
                                        }}
                                    />
                                </Link>
                            </div>

                            {/* Product Details */}
                            <div className="item-details">
                                <p className="product-name">{product.name}</p>

                                <p className="product-brand">{product.brand}</p>

                            </div>
                            <div>
                                <p className="product-price">
                                    {product.price ? `$${parseFloat(product.price).toFixed(2)}` : "Free"}
                                </p>
                            </div>

                            {/* Action Buttons */}
                            <div className="item-actions">
                                {/* Unlike Button */}


                                {/* View Product Button */}
                                <Link to={`/products/${product.id}`} className="view-product-btn">

                                </Link>
                            </div>
                        </li>
                    ))
                ) : (
                    <p className="empty-favorites">You have no favorite products.</p>
                )}
            </ul>
            <button className="close-btn" onClick={toggleFavoritesOpen}>
                Close
            </button>
        </div>
    );
};

export default FavoritesModal;








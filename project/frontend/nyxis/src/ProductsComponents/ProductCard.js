import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faRegularHeart } from '@fortawesome/free-regular-svg-icons'; // Regular heart icon
import { faHeart as faSolidHeart, faHeartCrack, faCircleInfo } from '@fortawesome/free-solid-svg-icons'; // Solid icons

import { useNavigate } from 'react-router-dom'; // Add useNavigate for navigation
import '../Styles/ProductCard.css';

const ProductCard = ({ product, addToCart, toggleFavorite, isFavorite, searchTerm }) => {
    const [quantity, setQuantity] = useState(0); // Initialize quantity state
    const [added, setAdded] = useState(false); // Track if product is added to the cart
    const [cracking, setCracking] = useState(false); // Track the cracking animation for favorites
    const [hovered, setHovered] = useState(false); // State to track hover

    const navigate = useNavigate(); // Get the navigation function from react-router-dom
    // Adjust styles or structure for the favorites page


    // Fallback if the image fails to load
    const handleImageError = (e) => {
        e.target.src = 'https://cdn.shopify.com/s/files/1/0502/9393/2199/files/Forever_Mars24_Mood_Duo-Max_3000x3000_d91794a9-5222-42e4-a433-947a804b3259.jpg?v=1716970733'; // Replace with your fallback image
    };

    // Format price and display "$"
    const formatPrice = (price) => {
        const parsedPrice = parseFloat(price);
        if (isNaN(parsedPrice) || parsedPrice <= 0) {
            return "Free"; // Logic for showing "Free" if price is 0 or invalid
        }
        return `$${parsedPrice.toFixed(2)}`; // Return price formatted with $
    };

    // Function to assign color based on the tag name
    const getTagColor = (tag) => {
        switch (tag.toLowerCase()) {
            case 'vegan':
                return '#90EE90';
            case 'alcohol free':
                return '#B0E0E6';
            case 'organic':
                return '#6495ED';
            case 'canadian':
                return '#DC143C';
            case 'natural':
                return '#5F9EA0';
            case 'no talk':
                return '#FAFAD2';
            case 'non-gmo':
                return '#3CB371';
            case 'oil free':
                return '#F4A460';
            case 'cruelty free':
                return '#D8BFD8';
            case 'gluten free':
                return '#6A5ACD';
            case 'water free':
                return '#40E0D0';
            default:
                return 'grey';
        }
    };

    // Increase quantity
    const increaseQuantity = () => setQuantity(prev => prev + 1);

    // Decrease quantity (make sure it doesn't go below 0)
    const decreaseQuantity = () => quantity > 0 && setQuantity(prev => prev - 1);

    const handleAddToCart = () => {
        if (quantity > 0) {
            addToCart(product, quantity); // Ensure this line is correctly using addToCart
            setAdded(true); // Set added state to true
        }
    };

    const handleToggleFavorite = () => {
        if (isFavorite) {
            setCracking(true);
            setTimeout(() => {
                toggleFavorite(product);
                setCracking(false);
            }, 2000);
        } else {
            toggleFavorite(product);
        }
    };

    // Get tags for display (show max 2 tags, with the matching tag displayed first if it exists)
    const getTagsToDisplay = () => {
        const matchingTag = product.tag_list.find(tag => tag.toLowerCase() === searchTerm?.toLowerCase());
        let displayedTags = product.tag_list.slice(0, 2); // Get the first two tags by default

        // If there's a matching tag, ensure it is displayed first
        if (matchingTag) {
            displayedTags = displayedTags.filter(tag => tag.toLowerCase() !== matchingTag.toLowerCase());
            displayedTags = [matchingTag, ...displayedTags.slice(0, 1)]; // Ensure only 2 tags are shown
        }

        return displayedTags;
    };

    // Navigate to product detail page
    const handleGoToDetail = () => {
        navigate(`/products/${product.id}`); // Navigate to product detail page
    };

    return (
        <div
            className="product-card"
            onMouseEnter={() => setHovered(true)} // Set hovered to true on mouse enter
            onMouseLeave={() => setHovered(false)} // Set hovered to false on mouse leave
        >
            {/* Product Image */}
            <img
                src={product.image_link}
                alt={product.name}
                className="product-image"
                onError={handleImageError} // Handle image loading error
            />

            {/* Product Information */}
            <h3 className="product-name">{product.name}</h3>

            <p className={`product-brand ${!product.brand ? 'no-brand' : ''}`}>
                {product.brand ? product.brand : <span>&nbsp;</span>} {/* Display brand or empty space */}
            </p>


            {/* Render tags */}
            <div className="product-tags">
                {product.tag_list && product.tag_list.length > 0 ? (
                    getTagsToDisplay().map((tag, index) => (
                        <span
                            key={index}
                            className={`product-tag ${tag.toLowerCase() === searchTerm?.toLowerCase() ? 'highlight-tag' : ''}`}
                            style={{backgroundColor: getTagColor(tag)}}
                        >
                            {tag}
                        </span>
                    ))
                ) : (
                    <span className="product-tag-empty">&nbsp;</span>
                )}
            </div>
            <h3 className="product-price">{formatPrice(product.price)}</h3>



            <>


                {/* Add to Cart button */}
                <button
                    className="add-to-cart-btn"
                    onClick={handleAddToCart}
                    aria-label="Add to cart"
                    disabled={quantity === 0} // Disable if quantity is 0
                >
                    {added ? 'Added to Cart' : 'Add to Cart'}
                </button>
            </>

            {/* Save/Unsave to Favorites button */}
            <button
                className="save-favorite-btn"
                onClick={handleToggleFavorite}
            >
                {/* Cracking animation and favorite logic */}
                <FontAwesomeIcon icon={cracking ? faHeartCrack : (isFavorite ? faSolidHeart : faRegularHeart)}/>
            </button>

            {/* Hidden Info Button (appears on hover) */}
            {hovered && (
                <button
                    className="product-info-btn"
                    onClick={handleGoToDetail} // Navigate to product detail page on click
                >
                    <FontAwesomeIcon icon={faCircleInfo}/>
                </button>
            )}
        </div>
    );
};

export default ProductCard;















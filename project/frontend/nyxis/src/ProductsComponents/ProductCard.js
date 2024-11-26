import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHeart as faRegularHeart,
    faHeart as faSolidHeart,
    faHeartCrack,
    faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom"; // Use Link for navigation
import "../Styles/ProductCard.css";
import defaultImage from './nyxisdefault.jpg'; // Adjust the filename as needed

const ProductCard = ({ product, addToCart,  searchTerm }) => {
    const [quantity, setQuantity] = useState(0); // Initialize quantity state
    const [added, setAdded] = useState(false); // Track if product is added to the cart
    const [cracking, setCracking] = useState(false); // Track the cracking animation for favorites
    const [hovered, setHovered] = useState(false); // State to track hover
    const [inCart, setInCart] = useState(false); // Track if the product is in the cart


    // Fallback if the image fails to load
    const handleImageError = (e) => {
        e.target.src = defaultImage; // Use the imported default image
    };

    // Format price and display "$"
    const formatPrice = (price) => {
        const parsedPrice = parseFloat(price);
        if (isNaN(parsedPrice) || parsedPrice <= 0) {
            return "Sold Out"; // Logic for showing "Free" if price is 0 or invalid
        }
        return `$${parsedPrice.toFixed(2)}`; // Return price formatted with $
    };

    // Function to assign color based on the tag name
    const getTagColor = (tag) => {
        switch (tag.toLowerCase()) {
            case "vegan":
                return "#90EE90";
            case "alcohol free":
                return "#B0E0E6";
            case "organic":
                return "#6495ED";
            case "canadian":
                return "#DC143C";
            case "natural":
                return "#5F9EA0";
            case "no talk":
                return "#FAFAD2";
            case "non-gmo":
                return "#3CB371";
            case "oil free":
                return "#F4A460";
            case "cruelty free":
                return "#D8BFD8";
            case "gluten free":
                return "#6A5ACD";
            case "water free":
                return "#40E0D0";
            default:
                return "grey";
        }
    };

    // Increase quantity
    const increaseQuantity = () => setQuantity((prev) => prev + 1);

    // Decrease quantity (make sure it doesn't go below 0)
    const decreaseQuantity = () => quantity > 0 && setQuantity((prev) => prev - 1);



    // Check if the product is in the cart on mount
    useEffect(() => {
        const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
        const isInCart = cartItems.some((item) => item.id === product.id);
        setInCart(isInCart);
    }, [product.id]);

    // Add to Cart handler
    const handleAddToCart = () => {
        const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
        const updatedCart = [...cartItems, product];
        localStorage.setItem("cart", JSON.stringify(updatedCart)); // Save to localStorage
        addToCart(product, 1); // Trigger parent logic if needed
        setInCart(true); // Mark as in cart
    };



    // Get tags for display (show max 2 tags, with the matching tag displayed first if it exists)
    const getTagsToDisplay = () => {
        const matchingTag = product.tag_list.find(
            (tag) => tag.toLowerCase() === searchTerm?.toLowerCase()
        );
        let displayedTags = product.tag_list.slice(0, 2); // Get the first two tags by default

        // If there's a matching tag, ensure it is displayed first
        if (matchingTag) {
            displayedTags = displayedTags.filter(
                (tag) => tag.toLowerCase() !== matchingTag.toLowerCase()
            );
            displayedTags = [matchingTag, ...displayedTags.slice(0, 1)]; // Ensure only 2 tags are shown
        }

        return displayedTags;
    };

    return (
        <div
            className="product-card"
            onMouseEnter={() => setHovered(true)} // Set hovered to true on mouse enter
            onMouseLeave={() => setHovered(false)} // Set hovered to false on mouse leave
        >
            {/* Product Image Wrapped in Link */}
            <Link to={`/products/${product.id}`}>
                <img
                    src={product.image_link}
                    alt={product.name}
                    className="product-image"
                    onError={handleImageError} // Handle image loading error
                />
            </Link>

            {/* Product Information */}
            <h3 className="product-name">{product.name}</h3>
            <p className={`product-brand ${!product.brand ? "no-brand" : ""}`}>
                {product.brand ? product.brand : <span>&nbsp;</span>} {/* Display brand or empty space */}
            </p>

            {/* Render tags */}
            <div className="product-tags">
                {product.tag_list && product.tag_list.length > 0 ? (
                    getTagsToDisplay().map((tag, index) => (
                        <span
                            key={index}
                            className={`product-tag ${
                                tag.toLowerCase() === searchTerm?.toLowerCase()
                                    ? "highlight-tag"
                                    : ""
                            }`}
                            style={{ backgroundColor: getTagColor(tag) }}
                        >
                            {tag}
                        </span>
                    ))
                ) : (
                    <span className="product-tag-empty">&nbsp;</span>
                )}
            </div>
            <h3 className="product-price">{formatPrice(product.price)}</h3>

            {/* Quantity Controls */}


            {/* Add to Cart or In Cart Button */}
            {inCart ? (
                <button
                    className="in-cart-btn"
                    disabled // Disable the button when the product is in the cart
                >
                    In Cart
                </button>
            ) : (
                <button
                    className="add-to-cart-btn"
                    onClick={handleAddToCart}
                >
                    Add to Cart
                </button>
            )}

            {/*/!* Save/Unsave to Favorites button *!/*/}
            {/*<button className="favorite-btn" onClick={handleToggleFavorite}>*/}
            {/*    <FontAwesomeIcon*/}
            {/*        icon={cracking ? faHeartCrack : isFavorite ? faSolidHeart : faRegularHeart}*/}
            {/*    />*/}
            {/*</button>*/}
        </div>
    );
};

export default ProductCard;

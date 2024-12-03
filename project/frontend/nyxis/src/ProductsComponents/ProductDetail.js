import React, {useState, useEffect, useContext} from 'react';
import NyxisApi from "../api";
import "../Styles/ProductDetail.css";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faRegularHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeartCrack, faHeart as faSolidHeart } from '@fortawesome/free-solid-svg-icons';
import UserContext from "../OtherComponents/UserContext"; // Import UserContext for current user

import defaultImage from './nyxisdefault.jpg';  // Adjust the path as needed


const ProductDetail = ({ addToCart, toggleFavorite, favorites }) => {
    const { productId } = useParams();
    const {currentUser} = useContext(UserContext);
    const [product, setProduct] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [cracking, setCracking] = useState(false);
    const [inCart, setInCart] = useState(false); // Track if the product is in the cart

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const res = await NyxisApi.getProductById(productId);
                if (res) {
                    setProduct(res);
                    setSelectedColor(res.product_colors && res.product_colors.length > 0 ? res.product_colors[0].colour_name : null);
                } else {
                    setProduct(null);
                }
            } catch (error) {
                console.error("Error fetching product details:", error);
                setProduct(null);
            } finally {
                setLoading(false);
            }
        };

        fetchProductDetails();
    }, [productId]);

    useEffect(() => {
        if (product && currentUser) {
            const cartItems = JSON.parse(localStorage.getItem(`${currentUser.username}-cart`)) || [];
            const isInCart = cartItems.some((item) => item.id === product.id);
            setInCart(isInCart);
        }
    }, [product, currentUser]);


    // Add to Cart handler
    const handleAddToCart = () => {
        const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
        const updatedCart = [...cartItems, product];
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        addToCart(product, quantity);
        setInCart(true); // Mark the product as in the cart
    };

    // Remove from Cart handler
    const handleRemoveFromCart = () => {
        const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
        const updatedCart = cartItems.filter((item) => item.id !== product.id);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        setInCart(false); // Mark the product as not in the cart
    };

    // Check if the product is a favorite
    const isFavorite = favorites.some(fav => fav.id === product?.id);

    const increaseQuantity = () => setQuantity((prev) => prev + 1);
    const decreaseQuantity = () => setQuantity((prev) => Math.max(prev - 1, 1));

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

    // Format price and display "$"
    const formatPrice = (price) => {
        const parsedPrice = parseFloat(price);
        if (isNaN(parsedPrice) || parsedPrice <= 0) {
            return "Free";
        }
        return `$${parsedPrice.toFixed(2)}`;
    };

    if (loading) return <div>Loading...</div>;
    if (!product) return <div>Product not found</div>;

    return (
        <div className="product-detail-container">
            <div className="product-image-tags">
                <div className="product-image">
                    <img
                        src={product.image_link || defaultImage}
                        alt={product.name || "Default Nyxis Image"} // Add alt text for better accessibility
                        onError={(e) => (e.target.src = defaultImage)} // Fallback to default image if src fails
                    />

                    <button className="favorite-btn" onClick={handleToggleFavorite}>
                        <FontAwesomeIcon icon={cracking ? faHeartCrack : (isFavorite ? faSolidHeart : faRegularHeart)}/>
                    </button>
                </div>
                {product.tag_list && product.tag_list.length > 0 && (
                    <div className="product-tags">
                        <ul>
                            {product.tag_list.map((tag) => (
                                <li key={tag}>{tag}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            <div className="product-info">
                <h1>{product.name}</h1>
                <h2>{product.brand}</h2>
                <p className="product-price">{formatPrice(product.price)}</p>
                <p>{product.description}</p>
                <p>{selectedColor ? `Color: ${selectedColor}` : ''}</p>

                {product.product_colors && product.product_colors.length > 0 && (
                    <div className="product-colors">
                        {product.product_colors.map((color) => (
                            <div
                                key={color.colour_name}
                                className="color-circle"
                                style={{ backgroundColor: color.hex_value }}
                                onMouseEnter={() => setSelectedColor(color.colour_name)}
                            />
                        ))}
                    </div>
                )}

                {/* Add to Cart or In Cart Button */}
                {inCart ? (
                    <button className="in-cart-btn" disabled>
                        In Cart
                    </button>
                ) : (
                    <button className="add-to-cart-btn" onClick={handleAddToCart}>
                        Add to Cart
                    </button>
                )}
            </div>
        </div>
    );
};

export default ProductDetail;





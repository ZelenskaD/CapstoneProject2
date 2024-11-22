import React, { useState, useEffect } from 'react';
import NyxisApi from "../api";
import "../Styles/ProductDetail.css";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faRegularHeart } from '@fortawesome/free-regular-svg-icons'; // Correct regular heart icon
import { faHeartCrack, faHeart as faSolidHeart } from '@fortawesome/free-solid-svg-icons'; // Solid heart and cracked heart icons

const ProductDetail = ({ addToCart, toggleFavorite, favorites }) => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [cracking, setCracking] = useState(false);


    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const res = await NyxisApi.getProductById(productId);
                if (res) {
                    setProduct(res); // Make sure res is valid
                    setSelectedColor(res.product_colors && res.product_colors.length > 0 ? res.product_colors[0].colour_name : null);
                } else {
                    setProduct(null); // Handle case when product is not found
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

    // Check if the product is a favorite
    const isFavorite = favorites.some(fav => fav.id === product?.id);

    const increaseQuantity = () => setQuantity((prev) => prev + 1);
    const decreaseQuantity = () => setQuantity((prev) => Math.max(prev - 1, 1));

    const handleAddToCart = () => {
        if (product) {
            addToCart(product, quantity); // Pass product and quantity to cart
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

    // Format price and display "$"
    const formatPrice = (price) => {
        const parsedPrice = parseFloat(price);
        if (isNaN(parsedPrice) || parsedPrice <= 0) {
            return "Free"; // Logic for showing "Free" if price is 0 or invalid
        }
        return `$${parsedPrice.toFixed(2)}`; // Return price formatted with $
    };


    if (loading) return <div>Loading...</div>;
    if (!product) return <div>Product not found</div>;

    return (
        <div className="product-detail-container">
            <div className="product-image-tags">
                <div className="product-image">
                    <img src={product.image_link} alt={product.name} />
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

                <div className="quantity-controls">
                    <button onClick={decreaseQuantity} className="quantity-btn">-</button>
                    <span className="quantity-display">{quantity}</span>
                    <button onClick={increaseQuantity} className="quantity-btn">+</button>
                </div>

                <button className="add-to-cart-btn" onClick={handleAddToCart}>
                    Add to Cart
                </button>

                <button className="favorite-btn" onClick={handleToggleFavorite}>
                    <FontAwesomeIcon icon={cracking ? faHeartCrack : (isFavorite ? faSolidHeart : faRegularHeart)} />
                </button>

            </div>
        </div>
    );
};

export default ProductDetail;




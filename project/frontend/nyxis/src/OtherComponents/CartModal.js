import React from 'react';
import "../Styles/CartModal.css";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import defaultImage from './nyxisdefault.jpg';  // Adjust the path as needed

const CartModal = ({ cart = [], setCart, toggleCartOpen }) => {
    const navigate = useNavigate(); // Initialize useNavigate

    const calculateTotal = () => {
        return cart.reduce((acc, item) => acc + ((parseFloat(item.price) || 0) * item.quantity), 0).toFixed(2);
    };

    const handleRemoveItem = (productId) => {
        const updatedCart = cart.filter(item => item.id !== productId);
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart)); // Update localStorage
    };

    const handleIncreaseQuantity = (productId) => {
        const updatedCart = cart.map(item =>
            item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
        );
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart)); // Update localStorage
    };

    const handleDecreaseQuantity = (productId) => {
        const updatedCart = cart.map(item =>
            item.id === productId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
        );
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart)); // Update localStorage
    };

    const handleProductClick = (productId) => {
        navigate(`/products/${productId}`); // Navigate to product detail page
        toggleCartOpen(); // Close the cart modal when navigating to the product
    };

    return (
        <div className="cart-modal">
            <h2>Your Cart</h2>
            <ul className="cart-items">
                {cart.length > 0 ? (
                    cart.map((item) => (
                        <li key={item.id} className="cart-item">
                            <div className="item-image" onClick={() => handleProductClick(item.id)}>
                                <img
                                    src={item.image_link || defaultImage}
                                    alt={item.name}
                                    onError={(e) => e.target.src = defaultImage}
                                />
                            </div>
                            <div className="item-details">
                                <p>{item.name}</p>
                                <p>{item.brand}</p>
                                <p>{item.price && !isNaN(item.price) ? `$${parseFloat(item.price).toFixed(2)}` : 'N/A'}</p>
                            </div>
                            <div className="item-quantity">
                                <button className="minus-btn" onClick={() => handleDecreaseQuantity(item.id)}>-</button>
                                <span>{item.quantity}</span>
                                <button className="plus-btn" onClick={() => handleIncreaseQuantity(item.id)}>+</button>
                            </div>
                            <button className="remove-item-btn" onClick={() => handleRemoveItem(item.id)}>
                                <FontAwesomeIcon icon={faTrashCan} />
                            </button>
                        </li>
                    ))
                ) : (
                    <p className="prg">Your cart is empty</p>
                )}
            </ul>
            <h3 className="total-cart-price">Total: ${calculateTotal()}</h3>
            <button className="checkout-btn">Checkout</button>
            <button className="cancel-btn" onClick={toggleCartOpen}>Close</button>
        </div>
    );
};

export default CartModal;








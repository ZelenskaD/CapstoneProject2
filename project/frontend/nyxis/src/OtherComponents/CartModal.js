import React from 'react';
import "../Styles/CartModal.css";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserContext from "../OtherComponents/UserContext";

import defaultImage from './nyxisdefault.jpg';  // Adjust the path as needed
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';

import { loadStripe } from '@stripe/stripe-js';
import NyxisApi from "../api";

const stripeApiKey = `${process.env.REACT_APP_STRIPE_PUBLISH_KEY}`;
const stripePromise = loadStripe(stripeApiKey); // Use test public key


const CartModal = ({ cart = [], setCart, toggleCartOpen }) => {
    const navigate = useNavigate(); // Initialize useNavigate
    const [orderPlaced, setOrderPlaced] = useState(false); // You can set this state based on order status
    const { currentUser } = useContext(UserContext);




    const handleOrderSuccess = () => {
        navigate('/success');  // Redirect to /success page
    };

    // Example order submission logic
    const submitOrder = () => {
        setTimeout(() => {
            setOrderPlaced(true);
            handleOrderSuccess();
        }, 2000);
    };



    const calculateTotal = () => {
        return cart.reduce((acc, item) => acc + ((parseFloat(item.price) || 0) * item.quantity), 0).toFixed(2);
    };


    const handleRemoveItem = (productId) => {
        const updatedCart = cart.filter(item => item.id !== productId);
        setCart(updatedCart);

        // Save to storage based on user login
        if (currentUser) {
            localStorage.setItem(`${currentUser.username}-cart`, JSON.stringify(updatedCart));
        } else {
            sessionStorage.setItem('cart', JSON.stringify(updatedCart));
        }
    };




    const handleIncreaseQuantity = (productId) => {
        const updatedCart = cart.map(item =>
            item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
        );
        setCart(updatedCart);

        // Save to storage based on user login
        if (currentUser) {
            localStorage.setItem(`${currentUser.username}-cart`, JSON.stringify(updatedCart));
        } else {
            sessionStorage.setItem('cart', JSON.stringify(updatedCart));
        }
    };



    const handleDecreaseQuantity = (productId) => {
        const updatedCart = cart.map(item =>
            item.id === productId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
        );
        setCart(updatedCart);

        // Save to storage based on user login
        if (currentUser) {
            localStorage.setItem(`${currentUser.username}-cart`, JSON.stringify(updatedCart));
        } else {
            sessionStorage.setItem('cart', JSON.stringify(updatedCart));
        }
    };




    const handleProductClick = (productId) => {
        navigate(`/products/${productId}`); // Navigate to product detail page
        toggleCartOpen(); // Close the cart modal when navigating to the product
    };


    const convertToStripeLineItems = (cart) => {
        const defaultImagePath = 'https://media.istockphoto.com/id/1296705483/photo/make-up-products-prsented-on-white-podiums-on-pink-pastel-background.jpg?s=612x612&w=0&k=20&c=j3Vfpo81L5I2g0uJ5tArBC3l_fcPtPAcLzzT4pq5BLY='

        const checkImageLoaded = (imageUrl) => {
            return new Promise((resolve) => {
                const img = new Image();
                img.onload = () => resolve(true); // If image loads successfully
                img.onerror = () => resolve(false); // If image fails to load
                img.src = imageUrl;
            });
        };

        return cart.map(async (item) => {
            // Check if the image link is valid
            const imageLink = item.image_link;
            const imageValid = imageLink && await checkImageLoaded(imageLink);

            const finalImage = imageValid ? imageLink : defaultImagePath;

            return {
                price_data: {
                    currency: 'usd', // Ensure currency is lowercase (e.g., 'cad')
                    product_data: {
                        name: item.name, // Product name
                        description: item.description, // Product description
                        images: [finalImage], // Product image (as an array of URLs)
                    },
                    unit_amount: Math.round(parseFloat(item.price) * 100), // Convert price to cents
                },
                quantity: item.quantity, // Quantity of the product
                adjustable_quantity: {
                    enabled: true, // If true, the quantity is adjustable by the customer during checkout
                    minimum: 1, // Minimum quantity allowed
                    maximum: 10, // Maximum quantity allowed
                }
            };
        });
    };


    const handleStripeClick = async (event) => {
        const lineItems = await Promise.all(convertToStripeLineItems(cart));

        // Call your backend to create a Checkout session
        const data = await NyxisApi.getStripeID(lineItems);

        // Redirect to Stripe Checkout
        const stripe = await stripePromise;
        const { error } = await stripe.redirectToCheckout({
            sessionId: data.id,
        });

        if (error) {
            console.error('Error redirecting to checkout:', error);
        }
    };

    console.log(cart)

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
                                <FontAwesomeIcon icon={faTrashCan}/>
                            </button>
                        </li>
                    ))
                ) : (
                    <p className="prg">Your cart is empty</p>
                )}
            </ul>

            <div className="test-notification">
                <p><strong>Notice:</strong> You are in Test Mode. Please use one of the following test card numbers:</p>
                <ul>
                    <li>Card number: <code>4242 4242 4242 4242</code> (Any future expiration date, any CVC)</li>
                    <li>Card number: <code>4000 0000 0000 9995</code> (Declined card for testing purposes)</li>
                    <li>Card number: <code>4000 0000 0000 0341</code> (Card with insufficient funds)</li>
                    <li>Card number: <code>5555 5555 5555 4444</code> (3D Secure required)</li>
                </ul>
                <p>For more test cards, check the <a href="https://stripe.com/docs/testing" target="_blank"
                                                     rel="noopener noreferrer">Stripe Testing Documentation</a>.</p>
            </div>

            <h3 className="total-cart-price">Total: ${calculateTotal()}</h3>
            <button className="checkout-btn" role="link" onClick={handleStripeClick}>Checkout</button>
            <button className="cancel-btn" onClick={toggleCartOpen}>Close</button>
        </div>
    );
};

export default CartModal;








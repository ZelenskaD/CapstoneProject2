import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NyxisApi from '../api';  // Import the method from api.js
import '../Styles/ButtonsComponent.css';  // Optional for additional styling

function ButtonsComponent() {
    const [productType, setProductType] = useState([]);
    const [tags, setTags] = useState([]);
    const navigate = useNavigate();  // useNavigate from React Router

    useEffect(() => {
        // Fetch product types and tags from API when the component loads
        async function fetchData() {
            try {
                const uniqueProductTypes = await NyxisApi.getProductTypeNames(); // Call the method from api.js
                const uniqueTags = await NyxisApi.getTagNames(); // Another call for tags
                setProductType(uniqueProductTypes); // Set the product types from the API response
                setTags(uniqueTags); // Set the tags from the API response
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        fetchData();
    }, []);

    // Function to handle redirection when a button is clicked
    const handleProductTypeClick = (product_type) => {
        navigate(`/makeup/product_type/${product_type}`);  // Correct route for product types
    };

    const handleTagClick = (tag) => {
        navigate(`/makeup/tag/${tag}`);  // Correct route for tags
    };

    return (
        <div className="carousels-container">
            {/* First Carousel for Product Types */}
            <div className="carousel-wrapper">
                <div className="carousel">
                    {productType.map(product_type => (
                        <button
                            key={product_type}
                            className="carousel-btn"
                            onClick={() => handleProductTypeClick(product_type)} // On button click, redirect to the product_type page
                        >
                            {product_type}
                        </button>
                    ))}
                </div>
            </div>

        </div>
    );
}

export default ButtonsComponent;





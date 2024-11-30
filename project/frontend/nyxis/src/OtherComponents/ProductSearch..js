import React, { useState } from 'react';
import axios from 'axios';
import { debounce } from 'lodash';
import defaultImage from './nyxisdefault.jpg';

function ProductSearch() {
    const [products, setProducts] = useState([]);
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Function to handle search by name
    const searchProductsByName = async (query) => {
        try {
            setLoading(true);
            const response = await axios.get(`https://nyxis-backend.surganov.dev/api/v1/products?name=${encodeURIComponent(query)}`);
            setLoading(false);
            return response.data;
        } catch (error) {
            setLoading(false);
            setError(error.response?.data?.detail || 'An unknown error occurred');
            return [];
        }
    };

    const debouncedSearch = debounce(async (query) => {
        if (query) {
            const results = await searchProductsByName(query);
            setProducts(results);
        } else {
            setProducts([]);
        }
    }, 500);

    const handleSearchChange = (e) => {
        const searchTerm = e.target.value;
        setQuery(searchTerm);
        debouncedSearch(searchTerm);
    };

    const handleImageError = (e) => {
        e.target.src = defaultImage; // Fallback image
    };

    const formatPrice = (price) => {
        const parsedPrice = parseFloat(price);
        if (isNaN(parsedPrice) || parsedPrice <= 0) {
            return "Sold Out";
        }
        return `$${parsedPrice.toFixed(2)}`;
    };

    return (
        <div>
            <input
                type="text"
                value={query}
                onChange={handleSearchChange}
                placeholder="Search for a product..."
            />
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}
            <div>
                {products.length > 0 ? (
                    products.map((product) => (
                        <div key={product.id} className="product-card">
                            <img
                                src={product.image_link}
                                alt={product.name}
                                onError={handleImageError}
                            />
                            <h3>{product.name}</h3>
                            <p>{product.description}</p>
                            <p><strong>Price: {formatPrice(product.price)}</strong></p>
                            <p><a href={product.product_link} target="_blank" rel="noopener noreferrer">View Product</a></p>
                        </div>
                    ))
                ) : (
                    <p>No products found</p>
                )}
            </div>
        </div>
    );
}

export default ProductSearch;





import React, { useState } from 'react';
import ProductsList from './ProductsList';

function SearchProductsPage() {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <div>
            <input type="text" placeholder="Search products..." onChange={handleSearchChange} />
            <ProductsList searchQuery={searchQuery} />
        </div>
    );
}

export default SearchProductsPage;

import React, { useContext, useEffect, useState } from 'react';
import NyxisApi from '../api';
import ProductsList from './ProductsList';
import { useParams } from 'react-router-dom';
import "../Styles/FilteredProducts.css";
import UserContext from '../OtherComponents/UserContext';

function FilteredProducts({ filterType, addToCart, toggleFavorite, favorites }) {
    const { tag, product_type, brand } = useParams();
    const { currentUser } = useContext(UserContext);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Determine filter value based on filter type
    const filterValue = filterType === 'tag'
        ? tag?.toLowerCase()
        : filterType === 'brand'
            ? brand?.toLowerCase()
            : product_type?.toLowerCase();

    // Fetch filtered products based on filter type and value
    useEffect(() => {
        async function fetchFilteredProducts() {
            try {
                let filteredProducts = [];
                if (filterType === 'product_type') {
                    filteredProducts = await NyxisApi.getProductsByProductType(filterValue);
                } else if (filterType === 'tag') {
                    const allProducts = await NyxisApi.getAllProducts();
                    filteredProducts = allProducts.filter(product =>
                        product.tag_list.some(tagItem => tagItem.toLowerCase() === filterValue)
                    );
                } else if (filterType === 'brand') {
                    filteredProducts = await NyxisApi.getProductsByBrand(filterValue);
                }
                setProducts(filteredProducts);
            } catch (error) {
                setError("Error fetching products. Please try again later.");
            } finally {
                setLoading(false);
            }
        }

        if (filterValue) {
            fetchFilteredProducts();
        }
    }, [filterType, filterValue]);

    if (loading) {
        return <div>Loading products...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <ProductsList
                products={products}
                cart={JSON.parse(localStorage.getItem(`${currentUser?.username}-cart`)) || []}
                currentUser={currentUser}
                addToCart={addToCart}
                searchTerm={filterValue}
                favorites={favorites}
                toggleFavorite={toggleFavorite}
                isFavorite={false}
            />
        </div>
    );
}

export default FilteredProducts;





















import React, { useEffect, useState } from 'react';
import NyxisApi from '../api';
import ProductsList from './ProductsList';
import { useParams } from 'react-router-dom';
import "../Styles/FilteredProducts.css"

function FilteredProducts({ filterType , addToCart,  toggleFavorite , favorites }) {
    const { tag, product_type, brand } = useParams(); // Handle tag, brand, and product_type
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Correct assignment of filterValue based on filterType
    const filterValue = filterType === 'tag'
        ? tag?.toLowerCase()
        : filterType === 'brand'
            ? brand?.toLowerCase()
            : product_type?.toLowerCase();


    useEffect(() => {
        async function fetchFilteredProducts() {
            try {
                let filteredProducts = [];

                // Filter by product_type using the method you provided
                if (filterType === 'product_type') {
                    filteredProducts = await NyxisApi.getProductsByProductType(filterValue);
                }

                // Filter by tag
                else if (filterType === 'tag') {
                    const allProducts = await NyxisApi.getAllProducts();
                    filteredProducts = allProducts.filter(product =>
                        product.tag_list.some(tagItem => tagItem.toLowerCase() === filterValue)
                    );
                }

                // Filter by brand
                else if (filterType === 'brand') {
                    filteredProducts = await NyxisApi.getProductsByBrand(filterValue);
                }

                setProducts(filteredProducts); // Set the filtered products
            } catch (error) {
                setError("Error fetching products. Please try again later.");
            } finally {
                setLoading(false);
            }
        }

        if (filterValue) {
            fetchFilteredProducts();
        }
    }, [filterType, filterValue]); // Added filterValue to dependency array





    if (loading) {
        return <div>Loading products...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <ProductsList products={products} addToCart={addToCart} searchTerm={filterValue} favorites={favorites} toggleFavorite={toggleFavorite}
                          isFavorite={false} />
        </div>
    );
}

export default FilteredProducts;



















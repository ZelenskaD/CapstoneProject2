import React, { useContext, useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import '../Styles/ProductList.css'; // Add your custom CSS
import NyxisApi from '../api'; // Assuming NyxisApi is used for API calls

const ProductsList = ({ addToCart, toggleFavorite, favorites = [], filterType = null, filterValue = null, products: passedProducts = [], searchTerm, cart, handleRemoveFromCart, currentUser}) => {


    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filteredProducts, setFilteredProducts] = useState([]);

    const productsPerPage = 20;
    const maxPageButtons = 5;  // Number of page buttons to display at once

    useEffect(() => {
        console.log("Current User Cart:", cart);
    }, [cart]);

    useEffect(() => {
        console.log("Cart in ProductsList:", cart);
    }, [cart]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                let res;

                // Fetch products based on filterType or get all products
                if (passedProducts.length === 0) {
                    if (!filterType && !filterValue) {
                        res = await NyxisApi.getAllProducts(); // Fetch all products from API
                    } else if (filterType === 'category') {
                        res = await NyxisApi.getProductsByCategory(filterValue);
                    } else if (filterType === 'tag') {
                        const allProducts = await NyxisApi.getAllProducts();
                        res = allProducts.filter(product =>
                            product.tag_list &&
                            product.tag_list.some(tag =>
                                tag.toLowerCase() === filterValue.toLowerCase()
                            )
                        );
                    } else if (filterType === 'brand') {
                        res = await NyxisApi.getProductsByBrand(filterValue); // Fetch products by brand
                    }
                } else {
                    // Use passed products if available
                    res = passedProducts;
                }

                // Filter out products where price === 0
                const nonZeroPriceProducts = res.filter(product => parseFloat(product.price) > 0);

                setProducts(nonZeroPriceProducts); // Set the filtered products
            } catch (err) {
                setError('Error fetching products. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [filterType, filterValue, passedProducts]);



    // Filter products based on the search term
    useEffect(() => {
        if (searchTerm) {
            setFilteredProducts(products.filter(product =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (product.brand && product.brand.toLowerCase().includes(searchTerm.toLowerCase()))
            ));
        } else {
            setFilteredProducts(products);
        }
    }, [searchTerm, products]);

    if (loading) {
        return (
            <div className="loading-container">
                <img src="/project/frontend/nyxis/src/loading.gif" alt="Loading..." className="loading-gif" />
            </div>
        );
    }

    if (error) return <p>{error}</p>;

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    const totalPages = Math.ceil(products.length / productsPerPage);

    // Determine the start and end page for pagination buttons
    const startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
    const endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (

        <div>
            <div className="products-list">
                {currentProducts.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        addToCart={addToCart}  // Pass addToCart
                        toggleFavorite={toggleFavorite}
                        isFavorite={favorites.some(fav => fav.id === product.id)}  // Check if product is a favorite
                        searchTerm={searchTerm}
                        currentUser={currentUser} // Pass current user context
                        cart={cart }
                        handleRemoveItem={handleRemoveFromCart} // Optional

                    />
                ))}
            </div>

            <div className="pagination">
                {currentPage > 1 && (
                    <button onClick={() => paginate(currentPage - 1)} className="page-button">
                        Prev
                    </button>
                )}
                {Array.from({ length: endPage - startPage + 1 }, (_, i) => (
                    <button
                        key={i + startPage}
                        onClick={() => paginate(i + startPage)}
                        className={`page-button ${currentPage === i + startPage ? 'active' : ''}`}
                    >
                        {i + startPage}
                    </button>
                ))}
                {currentPage < totalPages && (
                    <button onClick={() => paginate(currentPage + 1)} className="page-button">
                        Next
                    </button>
                )}
            </div>
        </div>
    );
};

export default ProductsList;











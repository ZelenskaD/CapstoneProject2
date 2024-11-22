const axios = require('axios');

async function fetchProductsFromAPI() {
    try {
        const response = await axios.get('http://makeup-api.herokuapp.com/api/v1/products.json');
        return response.data;
    } catch (err) {
        console.error("Error fetching products from API", err);
        throw new Error('API fetch failed');
    }
}

module.exports = { fetchProductsFromAPI };





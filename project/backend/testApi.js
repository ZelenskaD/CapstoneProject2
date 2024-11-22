const axios = require('axios');

(async function testApi() {
    try {
        const response = await axios.get('http://makeup-api.herokuapp.com/api/v1/products.json');
        console.log("API data:", response.data);
    } catch (err) {
        console.error("Failed to fetch data from API:", err);
    }
})();

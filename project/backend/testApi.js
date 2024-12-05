const axios = require('axios');

(async function testApi() {
    try {
        const response = await axios.get('http://makeup-api.herokuapp.com/api/v1/products.json');
    } catch (err) {
        throw err;
    }
})();

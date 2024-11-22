const express = require('express');
const axios = require('axios');
const router = express.Router();

// Route to fetch products from external API
router.get('/makeup', async (req, res) => {
    try {
        const response = await axios.get('http://makeup-api.herokuapp.com/api/v1/products.json');
        res.json(response.data); // Return data from external API
    } catch (err) {
        console.error('Error fetching products from external API:', err);
        res.status(500).json({ error: 'Failed to fetch products from external API' });
    }
});


router.get('/makeup/:product_type', async (req, res) => {
    try {
        const { product_type } = req.params;
        const response = await axios.get(`http://makeup-api.herokuapp.com/api/v1/products.json?product_type=${product_type}`);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching products by product type:', error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});


router.get('/makeup/:tag', async (req, res) => {
    try {
        const { tag } = req.params;
        const response = await axios.get(`http://makeup-api.herokuapp.com/api/v1/products.json?product_tags=${tag}`);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching products by category:', error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

router.get('/makeup/:brand', async (req, res) => {
    try {
        const { brand} = req.params;
        const response = await axios.get(`http://makeup-api.herokuapp.com/api/v1/products.json?brand=${brand}`);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching products by brand:', error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});


module.exports = router;











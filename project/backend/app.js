const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const productsRoutes = require('./routes/products'); // Correctly reference the products route
const { createProxyMiddleware } = require('http-proxy-middleware');
const authRoutes = require("./routes/auth");
const usersRoutes = require("./routes/users");
const { authenticateJWT } = require("./middleware/auth");
const stripeRoutes = require("./routes/stripe");


app.use(cors());
app.use(express.json());
app.use(authenticateJWT);
app.use("/api/stripe", stripeRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);





// Default route
app.get("/", (req, res) => {
    res.send("Welcome to Nyxis API!");
});

app.get('/makeup', async (req, res) => {
    try {
        const response = await axios.get('http://makeup-api.herokuapp.com/api/v1/products.json');
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products' });
    }
});

// Handle 404 errors
app.use(function (req, res, next) {
    res.status(404).json({ error: { message: "Not Found", status: 404 } });
});

app.use((err, req, res, next) => {
    console.error("Unhandled error:", err.stack || err.message || err);
    res.status(500).json({ error: "Internal server error" });
});


// Proxy middleware to forward requests to the external API
app.use('/api', createProxyMiddleware({
    target: 'http://makeup-api.herokuapp.com',
    changeOrigin: true,
    pathRewrite: {
        '^/api': '/api/v1/products.json', // Rewrite path for API
    },
}));
module.exports = app;



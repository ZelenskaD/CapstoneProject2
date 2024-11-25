import axios from "axios";

// const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001/api";
const BASE_URL =  "http://localhost:3001/api";

const API_URL = "https://nyxis-backend.surganov.dev/api/v1/products"
/** API Class.
 *
 * Static class tying together methods used to get/send to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class NyxisApi {
    // the token for interacting with the API will be stored here.
    static token;

    // General method to make API requests
    static async request(endpoint, data = {}, method = "get") {
        console.debug("API Call:", endpoint, data, method);

        // Authorization token passed in the headers
        const url = `${BASE_URL}/${endpoint}`;
        const headers = { Authorization: `Bearer ${NyxisApi.token}` };
        const params = (method === "get") ? data : {};

        try {
            return (await axios({ url, method, data, params, headers })).data;
        } catch (err) {
            console.error("API Error:", err.response);
            let message = err.response?.data?.error?.message || "Unknown error occurred";
            throw Array.isArray(message) ? message : [message];
        }
    }



    static async getAllProducts() {
        try {
            const res = await axios.get(API_URL);
            return res.data;
        } catch (error) {
            console.error("Error fetching products:", error);
            throw error;
        }
    }


    static async getProductById(productId) {
        try {
            const res = await axios.get(`${API_URL}/${productId}`);
            return res.data;
        } catch (error) {
            console.error("Error fetching product details:", error);
            throw error;
        }
    }



    static async getProductsByCategory(category) {
        try {
            const res = await axios.get(`${API_URL}?category=${category}`);
            return res.data;
        } catch (error) {
            console.error("Error fetching products by category:", error);
            throw error;
        }
    }


    static async getProductsByTag(tag) {
        try {
            const res = await axios.get(`${API_URL}?product_tags=${tag}`);
            return res.data;
        } catch (error) {
            console.error("Error fetching products by tag:", error);
            throw error;
        }
    }


    /** Get unique product types using an external API. */
    static async getProductTypeNames() {
        let res = await axios.get(API_URL);

        // Extract all product types from the products
        let productTypes = res.data.map(product => product.product_type);

        // Filter out undefined product types and remove duplicates
        let uniqueProductTypes = [...new Set(productTypes.filter(Boolean))];

        return uniqueProductTypes;
    }


    static async getProductsByProductType(product_type) {
        try {
            const res = await axios.get(`${API_URL}?product_type=${product_type}`);
            return res.data;
        } catch (error) {
            console.error("Error fetching products by product_type:", error);
            throw error;
        }
    }




    static async getTagNames() {
        try {
            const res = await axios.get(API_URL);
            // Extract tags from the product list
            let tags = res.data.map(product => product.tag_list).flat();
            return [...new Set(tags)]; // Return unique tags
        } catch (error) {
            console.error("Error fetching tags:", error);
            throw error;
        }
    }


    static async getBrandNames() {
        try {
            const res = await axios.get(API_URL);
            // Extract brands from the product list
            let brands = res.data.map(product => product.brand).flat();
            return [...new Set(brands)]; // Return unique brands
        } catch (error) {
            console.error("Error fetching brands:", error);
            throw error;
        }
    }


    /** Get products by brand using an external API. */
    static async getProductsByBrand(brand) {
        try {
            const res = await axios.get(`${API_URL}?brand=${brand}`);
            console.log("Products fetched by brand:", res.data); // Debugging line
            return res.data;
        } catch (error) {
            console.error("Error fetching products by brand:", error);
            throw error;
        }
    }


    static async login(loginData) {
        console.log("Login data:", loginData); // Log data being sent
        try {
            const res = await axios.post(`${BASE_URL}/auth/token`, loginData);
            console.log("Received token:", res.data.token); // Log token
            return res.data.token;
        } catch (err) {
            console.error("Login Error:", err.response || err.message);
            throw err;
        }
    }

    static async signup(signupData) {
        console.log("Signup request payload:", signupData); // Log payload
        try {
            const res = await axios.post(`${BASE_URL}/auth/register`, signupData, {
                headers: { "Content-Type": "application/json" },
                timeout: 10000, // Ensure enough timeout
            });


            console.log("Received token:", res.data.token); // Log token
            return res.data.token;
        } catch (err) {
            if (err.response) {
                console.error("Signup failed with server error:", err.response.data);
            } else {
                console.error("Signup failed with network error:", err.message);
            }
            throw err;
        }
    }


    /** Get the current user details by username. */
    static async getCurrentUser(username) {
        let res = await this.request(`users/${username}`);
        return res.user;
    }

    /** Update the user profile with new data. */
    static async updateProfile(username, data) {
        const res = await this.request(`users/${username}`, data, "patch");
        return res.user;
    }

    // Add more methods as needed...
}

export default NyxisApi;


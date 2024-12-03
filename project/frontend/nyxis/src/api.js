import axios from "axios";

const BASE_URL =  `${process.env.REACT_APP_BASE_URL_API}`;

const API_URL = `${process.env.REACT_APP_PRODUCT_URL_API}`
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
    static async request(endpoint, data = {}, method = "get", token = localStorage.getItem("nyxis-token")) {
        const url = `${endpoint}`;
        const headers = { Authorization: `Bearer ${token}` };
        const params = method === "get" ? data : {};

        try {
            return await axios({ url, method, data, params, headers });
        } catch (err) {
            throw err.response?.data?.error || new Error("An unexpected error occurred.");
        }
    }


    static async getAllProducts() {
        try {
            const res = await axios.get(API_URL);
            return res.data;
        } catch (error) {
            throw error;
        }
    }


    static async getProductById(productId) {
        try {
            const res = await axios.get(`${API_URL}/${productId}`);
            return res.data;
        } catch (error) {
            throw error;
        }
    }



    static async getProductsByCategory(category) {
        try {
            const res = await axios.get(`${API_URL}?category=${category}`);
            return res.data;
        } catch (error) {
            throw error;
        }
    }


    static async getProductsByTag(tag) {
        try {
            const res = await axios.get(`${API_URL}?product_tags=${tag}`);
            return res.data;
        } catch (error) {
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
            throw error;
        }
    }


    static async getBrandNames() {
        try {
            const res = await axios.get(API_URL);

            // Define the list of allowed brands
            const allowedBrands = [
                "colourpop", "boosh", "deciem", "alva", "glossier", "nyx", "fenty", "clinique",
                "dior", "smashbox", "marcellee", "stila", "annabelle", "covergirl", "e.l.f.",
                "maybellin", "almay", "milani", "l’oréal", "sante", "revlon", "pacifica", "mistura",
                "zorah", "suncoat", "moov", "misa", "orly", "essie", "dalish"

            ];

            // Filter products to only include those from allowed brands
            const brands = res.data
                .map(product => product.brand)
                .filter(brand => allowedBrands.includes(brand));

            // Return unique allowed brands
            return [...new Set(brands)];
        } catch (error) {
            throw error;
        }
    }




    /** Get products by brand using an external API. */
    static async getProductsByBrand(brand) {
        try {
            const res = await axios.get(`${API_URL}?brand=${brand}`);
            return res.data;
        } catch (error) {
            throw error;
        }
    }


    static async signup(signupData) {
        try {
            const res = await axios.post(`${BASE_URL}/auth/register`, signupData, {
                headers: { "Content-Type": "application/json" },
            });

            // Store the token in localStorage
            if (res.data.token) {
                localStorage.setItem("nyxis-token", res.data.token);
            }

            return { success: true, token: res.data.token };
        } catch (err) {
            return { success: false, errors: err.response?.data?.error?.message || ["Unexpected error"] };
        }
    }

    static async login(loginData) {
        try {
            const res = await axios.post(`${BASE_URL}/auth/token`, loginData);
            // Store the token in localStorage
            if (res.data.token) {
                localStorage.setItem("nyxis-token", res.data.token);
            }
            return res.data.token;
        } catch (err) {
            throw err;
        }
    }


    static async getStripeID(lineItems) {
        try {
            const response = await this.request(`${BASE_URL}/stripe/create-checkout-session`, lineItems, "post")
            return response.data
        } catch (err) {
            throw err
        }
    }

    static async getCurrentUser(username) {
        try {
            const response = await this.request(`${BASE_URL}/users/${username}`, {}, "get");
            return response.data;
        } catch (err) {
            throw err;
        }
    }






}

export default NyxisApi;


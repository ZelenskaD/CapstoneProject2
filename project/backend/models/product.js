"use strict";

const db = require("../db");
const bcrypt = require("bcrypt");
const { sqlForPartialUpdate } = require("../helpers/sql");
const {
    NotFoundError,
    BadRequestError,
    UnauthorizedError,
} = require("../expressError");

const { BCRYPT_WORK_FACTOR } = require("../config.js");



class Product {

    /** Get all products */
    static async getAllProducts() {
        const result = await db.query(`SELECT * FROM products`);
        return result.rows;
    }

    /** Get one product by name */
    static async getProductByName(name) {
        const result = await db.query(
            `SELECT * FROM products WHERE name = $1`, [name]
        );
        return result.rows[0];
    }

    /** Get product by product_type (assuming stored in categories table) */
    static async getProductByProductType(typeName) {
        const result = await db.query(
            `SELECT * FROM products
             WHERE category_id = (SELECT category_id FROM categories WHERE category_name = $1)`,
            [typeName]
        );
        return result.rows;
    }

    /** Get product by category */
    static async getProductByCategory(categoryName) {
        const result = await db.query(
            `SELECT * FROM products
             WHERE category_id = (SELECT category_id FROM categories WHERE category_name = $1)`,
            [categoryName]
        );
        return result.rows;
    }

    /** Get product by brand */
    static async getProductByBrand(brand) {
        const result = await db.query(
            `SELECT * FROM products WHERE brand = $1`, [brand]
        );
        return result.rows;
    }

    /** Filter products by price */
    static async filterProductsByPrice(minPrice, maxPrice) {
        const result = await db.query(
            `SELECT * FROM products WHERE price BETWEEN $1 AND $2`, [minPrice, maxPrice]
        );
        return result.rows;
    }

    /** Get product by ID */
    static async getProductById(productId) {
        const result = await db.query(
            `SELECT * FROM products WHERE product_id = $1`, [productId]
        );
        return result.rows[0];
    }

    /** Get products by tag */
    static async getProductsByTag(tagName) {
        const result = await db.query(
            `SELECT products.*
             FROM products
             JOIN products_tags ON products.product_id = products_tags.product_id
             JOIN tags ON products_tags.tag_id = tags.tag_id
             WHERE tags.tag_name = $1`,
            [tagName]
        );
        return result.rows;
    }



    // /** Get all categories */
    // static async getAllCategories() {
    //     const result = await db.query(`SELECT * FROM categories`);
    //     return result.rows;
    // }
    //
    // /** Get category by category name */
    // static async getCategoryByName(categoryName) {
    //     const result = await db.query(
    //         `SELECT * FROM categories WHERE category_name = $1`, [categoryName]
    //     );
    //     return result.rows[0];
    // }
}

module.exports = Product;

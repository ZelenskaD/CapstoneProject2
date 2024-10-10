
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



class Category {


/** Get all categories */
static async getAllCategories() {
    const result = await db.query(`SELECT * FROM categories`);
    return result.rows;
}

/** Get category by category name */
static async getCategoryByName(categoryName) {
    const result = await db.query(
        `SELECT * FROM categories WHERE category_name = $1`, [categoryName]
    );
    return result.rows[0];
}

}
module.exports = Category;

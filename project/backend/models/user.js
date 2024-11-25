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

/** Related functions for users. */

class User {
    /** authenticate user with username, password.
     *
     * Returns { username, first_name, last_name, email, is_admin }
     *
     * Throws UnauthorizedError is user not found or wrong password.
     **/

    static async authenticate(username, password) {
        const user = await db.query(
            `SELECT username, password
         FROM users
         WHERE username = $1`,
            [username]
        );

        if (user.rows.length === 0) {
            throw new UnauthorizedError("Invalid username/password");
        }

        const isValid = await bcrypt.compare(password, user.rows[0].password);
        if (!isValid) {
            throw new UnauthorizedError("Invalid username/password");
        }

        return user.rows[0];
    }


    /** Register user with data.
     *
     * Returns { username, firstName, lastName, email, isAdmin }
     *
     * Throws BadRequestError on duplicates.
     **/

    static async register({ username, firstName, lastName, password, email, deliveryAddress }) {
        console.time("Duplicate Check");
        const duplicateCheck = await db.query(
            `SELECT username FROM users WHERE username = $1`,
            [username]
        );
        console.timeEnd("Duplicate Check");

        if (duplicateCheck.rows[0]) {
            throw new BadRequestError(`Duplicate username: ${username}`);
        }

        console.time("Password Hashing");
        const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);
        console.timeEnd("Password Hashing");

        console.time("Database Insert");
        const result = await db.query(
            `INSERT INTO users
           (username, password, first_name, last_name, email, delivery_address, is_admin)
           VALUES ($1, $2, $3, $4, $5, $6, $7)
           RETURNING username, first_name AS "firstName", last_name AS "lastName", email, is_admin AS "isAdmin"`,
            [username, hashedPassword, firstName, lastName, email, deliveryAddress, false]
        );
        console.timeEnd("Database Insert");

        return result.rows[0];
    }



    // Update user information, including preferences and delivery address
    static async update(username, data) {
        if (data.password) {
            data.password = await bcrypt.hash(data.password, BCRYPT_WORK_FACTOR);
        }

        const {setCols, values} = sqlForPartialUpdate(
            data,
            {
                firstName: "first_name",
                lastName: "last_name",
                deliveryAddress: "delivery_address",
                preferences: "preferences",
                isAdmin: "is_admin",
            });
        const usernameVarIdx = "$" + (values.length + 1);

        const querySql = `UPDATE users 
                      SET ${setCols} 
                      WHERE username = ${usernameVarIdx} 
                      RETURNING username,
                                first_name AS "firstName",
                                last_name AS "lastName",
                                delivery_address AS "deliveryAddress",
                                preferences,
                                email,
                                is_admin AS "isAdmin"`;
        const result = await db.query(querySql, [...values, username]);
        const user = result.rows[0];

        if (!user) throw new NotFoundError(`No user: ${username}`);

        delete user.password;
        return user;
    }

    // Update user's password
    static async updatePassword(username, newPassword) {
        // Hash the new password before storing it
        const hashedPassword = await bcrypt.hash(newPassword, BCRYPT_WORK_FACTOR);

        // Update the password in the database
        const result = await db.query(
            `UPDATE users
         SET password = $1
         WHERE username = $2
         RETURNING username, first_name AS "firstName", last_name AS "lastName", email`,
            [hashedPassword, username]
        );

        const user = result.rows[0];

        if (!user) throw new NotFoundError(`No user found with username: ${username}`);

        return user;
    }


    static async getPreferences(username) {
        const result = await db.query(
            `SELECT preferences
         FROM users
         WHERE username = $1`,
            [username]
        );

        const preferences = result.rows[0];
        if (!preferences) throw new NotFoundError(`No preferences found for user: ${username}`);

        return preferences;
    }


    static async updatePreferences(username, preferences) {
        const querySql = `UPDATE users
                      SET preferences = $1
                      WHERE username = $2
                      RETURNING username, preferences`;
        const result = await db.query(querySql, [preferences, username]);

        const user = result.rows[0];
        if (!user) throw new NotFoundError(`No user: ${username}`);

        return user;
    }


    static async getDeliveryAddress(username) {
        const result = await db.query(
            `SELECT delivery_address AS "deliveryAddress"
         FROM users
         WHERE username = $1`,
            [username]
        );

        const address = result.rows[0];
        if (!address) throw new NotFoundError(`No delivery address found for user: ${username}`);

        return address;
    }


    static async getUser(username) {
        const result = await db.query(
            `SELECT username,
                first_name AS "firstName",
                last_name AS "lastName",
                email,
                preferences,
                delivery_address AS "deliveryAddress",
                is_admin AS "isAdmin"
         FROM users
         WHERE username = $1`,
            [username]
        );

        const user = result.rows[0];
        if (!user) throw new NotFoundError(`No user found: ${username}`);

        return user;
    }

    static async getUserOrders(userId) {
        const result = await db.query(
            `SELECT orders.order_id,
                orders.order_date,
                orders.total_price
         FROM orders
         WHERE orders.user_id = $1`,
            [userId]
        );

        return result.rows;
    }


    static async getUserCart(userId) {
        const result = await db.query(
            `SELECT products.product_id,
                products.name,
                cart_items.quantity,
                cart_items.price_at_time
         FROM cart_items
         JOIN products ON cart_items.product_id = products.product_id
         JOIN cart ON cart_items.cart_id = cart.cart_id
         WHERE cart.user_id = $1`,
            [userId]
        );

        return result.rows;
    }


    static async getUserFavorites(userId) {
        const result = await db.query(
            `SELECT products.product_id,
                products.name,
                products.brand,
                products.price
         FROM favorites
         JOIN products ON favorites.product_id = products.product_id
         WHERE favorites.user_id = $1`,
            [userId]
        );

        return result.rows;
    }


    static async getUserPersonalizedPicks(userId) {
        const result = await db.query(
            `SELECT products.product_id,
                products.name,
                products.brand,
                products.price
         FROM personalized_picks
         JOIN products ON personalized_picks.product_id = products.product_id
         WHERE personalized_picks.user_id = $1`,
            [userId]
        );

        return result.rows;
    }



    static async remove(username) {
        const result = await db.query(
            `DELETE FROM users
         WHERE username = $1
         RETURNING username`,
            [username]
        );
        const user = result.rows[0];
        if (!user) throw new NotFoundError(`No user: ${username}`);
    }



}


module.exports = User;
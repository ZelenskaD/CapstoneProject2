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




    /** Given a username, return data about user.
     *
     * Returns { username, first_name, last_name, is_admin, jobs }
     *   where jobs is { id, title, company_handle, company_name, state }
     *
     * Throws NotFoundError if user not found.
     **/

    static async getUser(username) {
        console.log("Querying database for username:", username);
        const result = await db.query(`
        SELECT username, first_name, last_name, email, is_admin
        FROM users
        WHERE username = $1
    `, [username]);
        console.log("Database result:", result.rows);
        if (!result.rows[0]) throw new NotFoundError(`No user: ${username}`);
        return result.rows[0];
    }














}


module.exports = User;
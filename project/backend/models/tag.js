
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



class Tag {


    /** Get all tags */
    const
    db = require("../db");

    static async getAllTags() {
        const result = await db.query(`SELECT * FROM tags`);
        return result.rows;
    }

    /** Get tag by tag name */
    static async getTagByName(tagName) {
        const result = await db.query(
            `SELECT * FROM tags WHERE tag_name = $1`, [tagName]
        );
        return result.rows[0];
    }
}
module.exports = Tag;
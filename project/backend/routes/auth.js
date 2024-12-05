"use strict";

/** Routes for authentication. */

const jsonschema = require("jsonschema");

const User = require("../models/user");
const express = require("express");
const router = new express.Router();
const { createToken } = require("../helpers/tokens");
const userAuthSchema = require("../schemas/userAuth.json");
const userRegisterSchema = require("../schemas/userRegister.json");
const { BadRequestError } = require("../expressError");
const db = require("../db"); // Import the db object


router.post("/register", async function (req, res, next) {
    try {
        // Schema validation
        const validator = jsonschema.validate(req.body, userRegisterSchema);
        if (!validator.valid) {
            const errors = validator.errors.map((e) => e.stack);
            console.error("Schema validation errors:", errors);
            throw new BadRequestError(errors);
        }

        // Duplicate username check
        const duplicateCheck = await db.query(
            `SELECT username FROM users WHERE username = $1`,
            [req.body.username]
        );
        if (duplicateCheck.rows[0]) {
            throw new BadRequestError("Username is already taken");
        }

        // Register user
        const newUser = await User.register(req.body);
        const token = createToken(newUser);
        return res.status(201).json({ token });
    } catch (err) {
        return next(err);
    }
});




router.post("/token", async function (req, res, next) {
    try {
        const { username, password } = req.body;

        const user = await User.authenticate(username, password);
        const token = createToken(user);
        return res.json({ token });
    } catch (err) {
        return next(err);
    }
});










module.exports = router;
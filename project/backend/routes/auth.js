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

/** POST /auth/token:  { username, password } => { token }
 *
 * Returns JWT token which can be used to authenticate further requests.
 *
 * Authorization required: none
 */

router.post("/api/auth/token", async function (req, res, next) {
    try {
        console.log("Login request body:", req.body); // Log incoming data

        const validator = jsonschema.validate(req.body, userAuthSchema);
        if (!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            console.error("Validation errors:", errs); // Log validation errors
            throw new BadRequestError(errs);
        }

        const { username, password } = req.body;
        const user = await User.authenticate(username, password);
        console.log("Authenticated user:", user); // Log authenticated user

        const token = createToken(user);
        return res.json({ token });
    } catch (err) {
        console.error("Login error:", err); // Log the error
        return next(err);
    }
});



/** POST /auth/register:   { user } => { token }
 *
 * user must include { username, password, firstName, lastName, email }
 *
 * Returns JWT token which can be used to authenticate further requests.
 *
 * Authorization required: none
 */

router.post("/register", async function (req, res, next) {
    try {
        console.log("Register request body:", req.body); // Log incoming data

        const validator = jsonschema.validate(req.body, userRegisterSchema);
        if (!validator.valid) {
            const errs = validator.errors.map((e) => e.stack);
            console.error("Validation failed:", errs); // Log validation errors
            throw new BadRequestError(errs);
        }

        const newUser = await User.register({ ...req.body, isAdmin: false });
        console.log("Registered user:", newUser); // Log user registration

        const token = createToken(newUser);
        return res.status(201).json({ token });
    } catch (err) {
        console.error("Error in /auth/register route:", err); // Log any errors
        return next(err);
    }
});









module.exports = router;
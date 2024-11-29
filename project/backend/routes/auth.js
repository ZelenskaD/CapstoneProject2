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

router.post("/register", async function (req, res, next) {
    console.log("Register request received:", req.body);
    try {
        console.time("Validation");
        const validator = jsonschema.validate(req.body, userRegisterSchema);
        console.timeEnd("Validation");

        if (!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            console.error("Validation errors:", errs);
            throw new BadRequestError(errs);
        }

        console.time("User Registration");
        const newUser = await User.register({ ...req.body, isAdmin: false });
        console.timeEnd("User Registration");

        res.locals.user = {
            username: newUser.username,
            isAdmin: newUser.isAdmin,
        };

        console.time("Token Creation");
        const token = createToken(newUser);
        console.timeEnd("Token Creation");

        return res.status(201).json({ token });
    } catch (err) {
        console.error("Error in /auth/register:", err);
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
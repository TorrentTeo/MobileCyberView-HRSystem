const { success, error, validation } = require("../../helpers/responseApi");
const { randomString, mailer } = require("../../helpers/common");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const Verification = require("../../models/Verification");
const config = require('config');
var http = require('http');
var fs = require('fs');


exports.register = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(422).json(validation(errors.array()));

    const { name, email, password, role, contact, emergencyContact } = req.body;

    try {
        let user = await User.findOne({ email: email.toLowerCase() });
        if (user)
            return res
                .status(422)
                .json(validation({ msg: "Email already registered" }));

        let newUser = new User({
            name,
            email: email.toLowerCase().replace(/\s+/, ""),
            password,
            role,
            contact, 
            emergencyContact
        });

        const hash = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(password, hash);

        await newUser.save();

        let verification = new Verification({
            token: randomString(50),
            userId: newUser._id,
            type: "Register New Account",
        });
        await verification.save();
        // var html = '';
        // fs.readFile("../API/app/email.html", 'utf8', function (error, pgResp) {
        //     if (error) {
        //         console.log(error);
        //     } else {
        //         html = pgResp;
        //         console.log(html)
        //     }
        // });
        // var res = str.replace("{linksys}", config.get('ApiRoute') + '/auth/verify/' + verification.token);
        // mailer(newUser.email, "Email Verification", html)


        res.status(201).json(
            success(
                "Registration was success, please check your email and click the link to activate your account.",
                {
                    user: {
                        id: newUser._id,
                        name: newUser.name,
                        email: newUser.email,
                        role: newUser.role,
                        contact: newUser.contact,
                        emergencyContact: newUser.emergencyContact,
                        verified: newUser.verified,
                        verifiedAt: newUser.verifiedAt,
                        createdAt: newUser.createdAt,
                    },
                    verification,
                },
                res.statusCode
            )
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).json(error("Server error", res.statusCode));
    }
};

exports.verify = async (req, res) => {
    const { token } = req.params;
    try {
        let verification = await Verification.findOne({
            token,
            type: "Register New Account",
        });
        if (!verification)
            return res
                .status(404)
                .json(error("Token is not valid", res.statusCode));

        let user = await User.findOne({ _id: verification.userId }).select(
            "-password"
        );
        user = await User.findByIdAndUpdate(user._id, {
            $set: {
                verified: true,
                verifiedAt: new Date(),
            },
        });
        verification = await Verification.findByIdAndRemove(verification._id);
        res
            .status(200)
            .json(
                success(
                    "Verification Successful",
                    null,
                    res.statusCode
                )
            );
    } catch (err) {
        console.log(err);
        res.status(500).json(error("Server error", res.statusCode));
    }
};

exports.login = async (req, res) => {
    // Validation
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(422).json(validation(errors.array()));

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        // Check the email
        // If there's not exists
        // Throw the error
        if (!user) return res.status(422).json(validation("Invalid credentials"));

        // Check the password
        let checkPassword = await bcrypt.compare(password, user.password);
        if (!checkPassword)
            return res.status(422).json(validation("Invalid credentials"));

        // Check user if not activated yet
        // If not activated, send error response
        if (user && !user.verified)
            return res
                .status(400)
                .json(error("Your account is not active yet.", res.statusCode));

        // If the requirement above pass
        // Lets send the response with JWT token in it
        const payload = {
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            },
        };

        jwt.sign(
            payload,
            config.get("jwtSecret"),
            { expiresIn: 7200 },
            (err, token) => {
                if (err) throw err;

                res
                    .status(200)
                    .json(success("Login success", { token, 
                        user: {
                            id: user._id, 
                            name: user.name, 
                            email: user.email, 
                            role: user.role
                        } 
                    }, res.statusCode));
            }
        );
    } catch (err) {
        console.log(err.message);
        res.status(500).json(error("Server error", res.statusCode));
    }
};

exports.resendVerification = async (req, res) => {
    const { email } = req.body;

    // Simple checking for email
    if (!email)
        return res.status(422).json(validation([{ msg: "Email is required" }]));

    try {
        const user = await User.findOne({ email: email.toLowerCase() });

        // Check the user first
        if (!user)
            return res.status(404).json(error("Email not found", res.statusCode));

        // If user exists
        // We gonna get data from verification by user ID
        let verification = await Verification.findOne({
            userId: user._id,
            type: "Register New Account",
        });

        // If there's verification data
        // Remove previous verification data and create a new one
        if (verification) {
            verification = await Verification.findByIdAndRemove(verification._id);
        }

        // Create a new verification data
        let newVerification = new Verification({
            token: randomString(50),
            userId: user._id,
            type: "Register New Account",
        });

        // Save the verification data
        await newVerification.save();

        // Send the response
        res
            .status(201)
            .json(
                success(
                    "Verification has been sent",
                    { verification: newVerification },
                    res.statusCode
                )
            );
    } catch (err) {
        console.error(err.message);
        res.status(500).json(error("Server error", res.statusCode));
    }
};

exports.getAuthenticatedUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");

        // Check the user just in case
        if (!user)
            return res.status(404).json(error("User not found", res.statusCode));

        // Send the response to check if working with postman
        res.status(200).json(success(`Hello ${user.name}`, { user }, res.statusCode));       
    } catch (err) {
        console.error(err.message);
        res.status(500).json(error("Server error", res.statusCode));
    }
};

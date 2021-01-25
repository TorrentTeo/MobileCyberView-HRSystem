const { success, error, validation } = require("../../helpers/responseApi");
const { randomString } = require("../../helpers/common");
const User = require("../../models/User");
const Verification = require("../../models/Verification");
const bcrypt = require("bcryptjs");


exports.forgot = async (req, res) => {
    const { email } = req.body;
    if (!email)
        return res.status(422).json(validation([{ msg: "Email is required" }]));

    try {
        const user = await User.findOne({ email: email.toLowerCase() });

        if (!user)
            return res.status(404).json(error("User not found", res.statusCode));
        let verification = await Verification.findOne({
            userId: user._id,
            type: "Forgot Password"
        });
        if (verification) {
            verification = await Verification.findByIdAndRemove(verification._id);
        }
        let newVerification = new Verification({
            token: randomString(50),
            userId: user._id,
            type: "Forgot Password"
        });
        await newVerification.save();
        res
            .status(201)
            .json(
                success(
                    "Forgot Password verification has been sent",
                    { verification: newVerification },
                    res.statusCode
                )
            );
    } catch (err) {
        console.error(err.message);
        res.status(500).json(error("Server error", res.statusCode));
    }
};

exports.reset = async (req, res) => {
    const { token, password } = req.body;
    if (!token)
        return res.status(422).json(validation([{ msg: "Token is required" }]));
    if (!password)
        return res.status(422).json(validation([{ msg: "Password is required" }]));
    try {
        let verification = await Verification.findOne({
            token,
            type: "Forgot Password"
        });
        if (!verification)
            return res
                .status(400)
                .json(
                    error("Token / Data that you input is not valid", res.statusCode)
                );
        let user = await User.findById(verification.userId);
        if (!user)
            return res.status(404).json(error("User not found", res.statusCode));
        let hash = await bcrypt.genSalt(10);
        let hashedPassword = await bcrypt.hash(password, hash);
        user = await User.findByIdAndUpdate(user._id, {
            password: hashedPassword
        });
        verification = await Verification.findByIdAndRemove(verification._id);
        res
            .status(200)
            .json(success("Password has been updated", null, res.statusCode));
    } catch (err) {
        console.error(err.message);
        res.status(500).json(error("Server error", res.statusCode));
    }
};
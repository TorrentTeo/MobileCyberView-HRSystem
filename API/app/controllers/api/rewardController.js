const Reward = require("../../models/reward")
const User = require("../../models/User");
const Wallet = require("../../models/wallet");
const { success, error, validation } = require("../../helpers/responseApi");


exports.rewardPost = async (req, res) => {

    try {
        const { name, description, validFrom, expiryDate, userid } = req.body;
        if (Date.parse(validFrom) > Date.parse(expiryDate))
            return res.status(400).json(error("Start date is greater than End date!", res.statusCode));

        let username = [];
        for (i = 0; i < userid.length; i++) {
            var [user] = await User.find({ _id: userid[i] })
            username.push(user.name)
        }
        let newEntry = new Reward({
            name,
            description,
            validFrom,
            expiryDate,
            userid,
            namelist: username
        })

        await newEntry.save();

        res.status(201).json(success("New record added successfully!",
            {
                newEntry
            },
            res.statusCode
        )
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).json(error("Server error", res.statusCode));
    }
};

exports.rewardGet = async (req, res) => {
    // 

    try {
        const user = await User.findById(req.user.id).select("-password");

        // Check the user just in case
        if (!user)
            return res.status(404).json(error("User not found", res.statusCode));

        await Reward.find({ userid: user._id }, function (err, values) {
            var reward = {};
            values.forEach(function (value) {
                var dateOfExpiry = Date.parse(value.expiryDate);
                var expired = dateOfExpiry < new Date() ? true : false;
                console.log(expired)
                if (expired) {
                    value.valid = false
                }
                console.log(value)
                reward[value._id] = value;
            });
            res.status(200).json(success("View reward",
                {
                    reward
                },
                res.statusCode
            )
            );
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).json(error("Server error", res.statusCode));
    }
};

exports.rewardGetAll = async (req, res) => {
    // 

    try {
        await Reward.find({}, function (err, values) {
            var reward = {};

            values.forEach(function (value) {
                var dateOfExpiry = Date.parse(value.expiryDate);
                var expired = dateOfExpiry < new Date() ? true : false;
                if (expired) {
                    value.valid = false
                }
                reward[value._id] = value;
            });
            res.status(200).json(success("View all rewards",
                {
                    reward
                },
                res.statusCode
            )
            );
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).json(error("Server error", res.statusCode));
    }
};

exports.rewardGetById = async (req, res) => {
    try {

        let reward = await Reward.findOne({
            _id: req.params._id
        });

        if (!reward)
            return res.status(404).json(error("Data not found", res.statusCode));
        res.status(200).json(success("View reward",
            {
                reward
            },
            res.statusCode
        )
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).json(error("Server error", res.statusCode));
    }
};

exports.rewardPut = async (req, res) => {
    try {
        const { id, name, description } = req.body;
        //Check whether the _id given is valid or not

        //Update user data

        let reward = await Reward.findByIdAndUpdate(id, {
            $set: {
                name: name,
                description: description,
            }
        });
        res.status(200).json(success("Edited successfully",
            {

            },
            res.statusCode
        )
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).json(error("Server error", res.statusCode));
    }
};
exports.rewardDelete = async (req, res) => {
    try {
        const { id } = req.body;
        //Update user data

        let reward = await Reward.findByIdAndRemove(id);

        res.status(200).json(success("Removed successfully",
            {

            },
            res.statusCode
        )
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).json(error("Server error", res.statusCode));
    }
};

exports.walletGet = async (req, res) => {
    // 
    try {
        const user = await User.findById(req.user.id).select("-password");

        // Check the user just in case
        if (!user)
            return res.status(404).json(error("User not found", res.statusCode));

        let wallet = await Wallet.find({ userid: user._id });
        console.log(wallet)
        if (wallet.length != 0) {

        } else {
            let newEntry = new Wallet({
                userid: req.user.id,
                point: 1000
            })
            await newEntry.save();
        }
        res.status(200).json(success("View wallet",
            {
                wallet
            },
            res.statusCode
        )
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).json(error("Server error", res.statusCode));
    }
};

exports.walletPost = async (req, res) => {
    // 
    try {
        const user = await User.findById(req.user.id).select("-password");
        // Check the user just in case
        if (!user)
            return res.status(404).json(error("User not found", res.statusCode));

        let wallet = await Wallet.findOne({ userid: user._id });
        if (wallet) {
            const { point, id } = req.body;
            //Check whether the _id given is valid or not

            //Update user data
            let wallet = await Wallet.findOneAndUpdate({ userid: id }, {
                $set: {
                    point: wallet.point + parseInt(point),
                }
            });
        } else {
            let newEntry = new Wallet({
                userid: req.user.id,
                point: 0
            })
            await newEntry.save();
        }
        res.status(200).json(success("View wallet",
            {
                wallet
            },
            res.statusCode
        )
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).json(error("Server error", res.statusCode));
    }
};

exports.walletEdit = async (req, res) => {
    // 
    try {
        const { point, id } = req.body;
        let wallet = await Wallet.findOne({ userid: id });
        if (wallet.length != 0) {
            let wallet = await Wallet.findOneAndUpdate({ userid: id }, {
                $set: {
                    point: wallet.point + parseInt(point),
                }
            });
        } else {
            let newEntry = new Wallet({
                userid: id,
                point: point
            })
            await newEntry.save();
        }

        res.status(200).json(success("View wallet",
            {
                wallet
            },
            res.statusCode
        )
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).json(error("Server error", res.statusCode));
    }
};
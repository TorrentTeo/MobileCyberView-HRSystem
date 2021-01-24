const Reward = require("../../models/reward")
const User = require("../../models/User");
const Wallet = require("../../models/wallet");
const { success, error, validation } = require("../../helpers/responseApi");


exports.newReward = async (req, res) => {
    const { name, description, validFrom, expiryDate } = req.body;
    try {
            let newEntry = new Reward({
                name,
                description,
                validFrom,
                expiryDate,
                userid: req.user.id
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

exports.viewReward = async (req, res) => {
    // 
    
    try {
            const user = await User.findById(req.user.id).select("-password");

            // Check the user just in case
            if (!user)
            return res.status(404).json(error("User not found", res.statusCode));

            let reward = await Reward.find({userid:user._id});
            
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

exports.viewWallet = async (req, res) => {
    // 
    
    try {
            const user = await User.findById(req.user.id).select("-password");

            // Check the user just in case
            if (!user)
            return res.status(404).json(error("User not found", res.statusCode));

            let wallet = await Wallet.find({userid:user._id});
            
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
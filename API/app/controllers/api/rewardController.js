const Reward = require("../../models/reward")
const User = require("../../models/User");
const Wallet = require("../../models/wallet");
const { success, error, validation } = require("../../helpers/responseApi");


exports.rewardPost = async (req, res) => {
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

exports.rewardGet = async (req, res) => {
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

exports.rewardGetById = async (req, res) => {    
    try {
            const user = await User.findById(req.user.id).select("-password");

            // Check the user just in case
            if (!user)
            return res.status(404).json(error("User not found", res.statusCode));

            let reward = await Reward.findOne({
                userid:user._id,
                _id:req.params._id
                });
            
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
            const updateOps = {};
            for (const ops of req.body) {
            updateOps[ops.propName] = ops.value;
            }
            //Check whether the _id given is valid or not
            let reward = await Reward.findOne({
                _id:req.params._id
            });
            if (!reward) {
                return res.status(404).json(error("_id not found in Reward", res.statusCode));
            }
            //Update user data
            
                reward = await Reward.findByIdAndUpdate(req.params._id,{
                    $set: updateOps
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
            //Check whether the _id given is valid or not
            let reward = await Reward.findOne({
                _id:req.params._id
            });
            if (!reward) {
                return res.status(404).json(error("_id not found in Reward", res.statusCode));
            }
            //Update user data
            
                reward = await Reward.findByIdAndRemove(req.params._id);

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
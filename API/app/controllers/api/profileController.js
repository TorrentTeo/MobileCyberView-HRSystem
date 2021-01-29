const Profile = require("../../models/profile")
const User = require("../../models/User");
const { success, error, validation } = require("../../helpers/responseApi");


exports.profilePost = async (req, res) => {
    const { category, description, date, createdAt, toWho } = req.body;
    try {
            let newEntry = new Profile({
                category,
                description,
                date,
                userid: req.user.id,
                writtenBy: req.user.name,
                createdAt
            })
        
            await newEntry.save();   
            
            // if the category is review, update the id to who user is trying to write the review on
            if (newEntry.category == "Review")
        {
            newEntry = await Profile.findByIdAndUpdate(newEntry._id,{
                $set: {
                    userid: toWho
                },
            });
        }
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

exports.profileGet = async (req, res) => {    
    try {
            const user = await User.findById(req.user.id).select("-password");

            // Check the user just in case
            if (!user)
            return res.status(404).json(error("User not found", res.statusCode));

            let profile = await Profile.find({userid:user._id});
            
            res.status(200).json(success("View profile",
                {
                    profile
                },
                res.statusCode
            )
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).json(error("Server error", res.statusCode));
    }
};

exports.profileGetById = async (req, res) => {    
    try {
            const user = await User.findById(req.user.id).select("-password");

            // Check the user just in case
            if (!user)
            return res.status(404).json(error("User not found", res.statusCode));

            let profile = await Profile.findOne({
                userid:user._id,
                _id:req.params._id
                });
            
            res.status(200).json(success("View profile",
                {
                    profile
                },
                res.statusCode
            )
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).json(error("Server error", res.statusCode));
    }
};

exports.profilePut = async (req, res) => {
    try {   
            const updateOps = {};
            for (const ops of req.body) {
            updateOps[ops.propName] = ops.value;
            }
            //Check whether the _id given is valid or not
            let profile = await Profile.findOne({
                _id:req.params._id
            });
            if (!profile) {
                return res.status(404).json(error("_id not found in Profile", res.statusCode));
            }
            //Update user data
            
                profile = await Profile.findByIdAndUpdate(req.params._id,{
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
exports.profileDelete = async (req, res) => {
    try {   
            //Check whether the _id given is valid or not
            let profile = await Profile.findOne({
                _id:req.params._id
            });
            if (!profile) {
                return res.status(404).json(error("_id not found in Profile", res.statusCode));
            }
            //Update user data
            
                profile = await Profile.findByIdAndRemove(req.params._id);

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
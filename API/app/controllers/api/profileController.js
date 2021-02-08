const Profile = require("../../models/profile")
const User = require("../../models/User");
const { success, error, validation } = require("../../helpers/responseApi");


exports.profilePost = async (req, res) => {
    let { category, description, date, toWho } = req.body;
    try {
            let user = await User.findById(req.user.id);
              
            let newEntry = new Profile({
                category,
                description,
                date,
                userid: req.user.id,
                writtenBy: req.user.name,
                name: user.name
            })
        
            await newEntry.save();   
            
            // if the category is review, update the id to who user is trying to write the review on
            if (newEntry.category == "Review")
        {
            let newUser = await User.findById(toWho);
            newEntry = await Profile.findByIdAndUpdate(newEntry._id,{
                $set: {
                    userid: toWho,
                    name: newUser.name
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
            const{id,category,description} = req.body;
            //Update user data
            if(category === "Review")
            return res.status(400).json(error("Review cannot be modify", res.statusCode));
                profile = await Profile.findByIdAndUpdate(id,{
                    $set: {
                        category: category,
                        description: description
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
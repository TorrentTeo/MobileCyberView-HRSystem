const User = require("../../models/User")
const { success, error, validation } = require("../../helpers/responseApi");


exports.accountGet = async (req, res) => {
    // 
    
    try {
            const user = await User.findById(req.user.id).select("-password");

            // Check the user just in case
            if (!user)
            return res.status(404).json(error("User not found", res.statusCode));
            
            res.status(200).json(success("View personal information",
                {
                    user
                },
                res.statusCode
            )
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).json(error("Server error", res.statusCode));
    }
};

exports.accountGetById = async (req, res) => {    
    try {
            let account = await User.findOne({
                _id:req.params._id
                });
            
            if (!account)
            return res.status(404).json(error("No data found", res.statusCode));
            
            res.status(200).json(success("View account",
                {
                    account
                },
                res.statusCode
            )
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).json(error("Server error", res.statusCode));
    }
};

exports.accountGetAll = async (req, res) => {
    // 
    
    try {
            const user = await User.find();

            // Check the user just in case
            if (!user)
            return res.status(404).json(error("User not found", res.statusCode));
            
            res.status(200).json(success("View all users",
                {
                    user
                },
                res.statusCode
            )
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).json(error("Server error", res.statusCode));
    }
};

exports.accountPut = async (req, res) => {
    
    try {
            const {email,contact,emergencyContact} = req.body;
            //Update user data
            let user = await User.findByIdAndUpdate(id,{
                    $set: {
                        email: email,
                        contact: contact,
                        emergencyContact:emergencyContact
                    }
                });

                res.status(200).json(success("Edited successfully",
                {
                    user
                    
                },
                res.statusCode
            )
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).json(error("Server error", res.statusCode));
    }
};

exports.accountDelete = async (req, res) => {
    try {   
            //Check whether the _id given is valid or not
            let user = await User.findOne({
                _id:req.params._id
            });
            if (!user) {
                return res.status(404).json(error("_id not found in User", res.statusCode));
            }
            //Remove user data
            
                user = await User.findByIdAndRemove(user.id);

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
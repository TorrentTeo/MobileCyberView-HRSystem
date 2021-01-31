const User = require("../../models/User")
const { success, error, validation } = require("../../helpers/responseApi");


exports.accountGet = async (req, res) => {
    // 
    
    try {
            const user = await User.findById(req.user.id).select("-password");

            // Check the user just in case
            if (!user)
            return res.status(404).json(error("User not found", res.statusCode));

            //let account = await User.find({userid:user._id});
            
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

exports.accountPut = async (req, res) => {
    
    try {
            const updateOps = {};
            for (const ops of req.body) {
            updateOps[ops.propName] = ops.value;
            }
            
            let user = await User.findOne({_id:req.params._id});

            // Check the user just in case
            if (!user)
            return res.status(404).json(error("User not found", res.statusCode));

            //Update user data
            user = await User.findByIdAndUpdate(user.id,{
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
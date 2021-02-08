const Feed = require("../../models/feed")
const User = require("../../models/User");
const { success, error, validation } = require("../../helpers/responseApi");


exports.feedPost = async (req, res) => {
    
    try {
            const { feedType,content,userid } = req.body;
            
            let username = [];
            for (i = 0; i < userid.length; i++) {
                var [user] = await User.find({_id: userid[i]})
                username.push(user.name)
              }
            let newEntry = new Feed({
                feedType,
                content,
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

exports.feedGet = async (req, res) => {
    // 
    
    try {
            const user = await User.findById(req.user.id).select("-password");

            // Check the user just in case
            if (!user)
            return res.status(404).json(error("User not found", res.statusCode));

            await Feed.find({userid:user._id}, function(err, values){
            var feed = {};
            values.forEach(function(value) {
                feed[value._id] = value;
            });
            res.status(200).json(success("View reward",
                {
                    feed
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

exports.feedGetAll = async (req, res) => {
    // 
    
    try {
            await Feed.find({}, function(err, values) {
                var feed = {};
       
            values.forEach(function(value) {

                feed[value._id] = value;
            });
            res.status(200).json(success("View all rewards",
                {
                    feed
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

exports.feedGetById = async (req, res) => {    
    try {
            
            let feed = await Feed.findOne({
                _id:req.params._id
                });
            
            if (!feed)
            return res.status(404).json(error("Data not found", res.statusCode));
            res.status(200).json(success("View feed",
                {
                    feed
                },
                res.statusCode
            )
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).json(error("Server error", res.statusCode));
    }
};

exports.feedPut = async (req, res) => {
    try {   
            const{id, content} = req.body;
            //Check whether the _id given is valid or not
            
            //Update user data
            
             let feed = await Feed.findByIdAndUpdate(id,{
                    $set: {
                    content: content
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

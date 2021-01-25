const Profile = require("../../models/profile")
const { success, error, validation } = require("../../helpers/responseApi");


exports.profilePost = async (req, res) => {
    let { category, description, date, createdAt, toWho } = req.body;
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
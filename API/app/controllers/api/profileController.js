const Profile = require("../../models/profile")
const { success, error, validation } = require("../../helpers/responseApi");


exports.createNew = async (req, res) => {
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
          /*  let review = await Profile.findOne({ category: "Review" });

        // if the category is review, update the id to who user is trying to write the review on
        if (review)
        {
            let shit = await Profile.findOne({ _id: newEntry.userid }).select(
                "-password"
            );
            shit = await Profile.findByIdAndUpdate(shit._id, {
                $set: {
                    userid: toWho
                },
            });
        }*/
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
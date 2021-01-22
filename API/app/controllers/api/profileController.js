const Profile = require("../../models/profile")
const { success, error, validation } = require("../../helpers/responseApi");


exports.createNew = async (req, res) => {
    const { category, description, date, userid, createdAt } = req.body;
    try {
            let newEntry = new Profile({
                category,
                description,
                date,
                userid: req.user.id,
                createdAt
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
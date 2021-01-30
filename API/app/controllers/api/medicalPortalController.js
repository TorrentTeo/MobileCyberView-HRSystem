const MedicalPlan = require("../../models/medicalPlan")
const ClinicList = require("../../models/clinicList")
const InsuranceCoverage = require("../../models/insuranceCoverage")
const User = require("../../models/User");
const LeaveApplication = require("../../models/leaveApplication");
const { success, error, validation } = require("../../helpers/responseApi");

exports.medicalLeaveGet = async (req, res) => {
    // 
    
    try {
            const user = await User.findById(req.user.id).select("-password");

            // Check the user just in case
            if (!user)
            return res.status(404).json(error("User not found", res.statusCode));

            let medicalLeave = await LeaveApplication.find({
                userid:user._id,
                reason: "Medical"
            });
            
            res.status(200).json(success("View medical leave",
                {
                    medicalLeave
                },
                res.statusCode
            )
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).json(error("Server error", res.statusCode));
    }
};

exports.medicalLeavePut = async (req, res) => {
    
    try {
            const updateOps = {};
            for (const ops of req.body) {
            updateOps[ops.propName] = ops.value;
        }
        //Check whether the _id given is valid or not
            let leave = await LeaveApplication.findOne({
                _id:req.params._id,
                userid:req.user.id
            });

            // If not, return 404
            if (!leave)
            return res.status(404).json(error("_id not found in Leave Application", res.statusCode));

            //Update user data
            leave = await LeaveApplication.findOneAndUpdate(leave.id,{
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

exports.medicalLeaveDelete = async (req, res) => {
    try {   
            //Check whether the _id given is valid or not
            let leave = await LeaveApplication.findOne({
                _id:req.params._id,
                userid:req.user.id
            });
            if (!leave) {
                return res.status(404).json(error("_id not found in Leave Application", res.statusCode));
            }
            //Update user data
            
            leave = await LeaveApplication.findByIdAndRemove(leave.id);

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

exports.medicalPlanGet = async (req, res) => {
    // 
    
    try {
            const user = await User.findById(req.user.id).select("-password");

            // Check the user just in case
            if (!user)
            return res.status(404).json(error("User not found", res.statusCode));

            let medicalPlan = await MedicalPlan.find({userid:user.id});
            
            res.status(200).json(success("View medical plan",
                {
                    medicalPlan
                },
                res.statusCode
            )
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).json(error("Server error", res.statusCode));
    }
};

exports.medicalPlanPost = async (req, res) => {
    const { medicalPlanName, medicalCardFront, medicalCardBack, userid } = req.body;
    try {
            let newEntry = new MedicalPlan({
                medicalPlanName,
                medicalCardFront,
                medicalCardBack,
                userid
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

exports.clinicListGet = async (req, res) => {
    // 
    
    try {
            const user = await User.findById(req.user.id).select("-password");

            // Check the user just in case
            if (!user)
            return res.status(404).json(error("User not found", res.statusCode));

            let clinic = await ClinicList.find({userid:user.id});
            
            res.status(200).json(success("View clinic",
                {
                    clinic
                },
                res.statusCode
            )
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).json(error("Server error", res.statusCode));
    }
};

exports.clinicListPost = async (req, res) => {
    const { clinicName, location, userid } = req.body;
    try {
            let newEntry = new ClinicList({
                clinicName,
                location,
                userid
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

exports.insuranceCoverageGet = async (req, res) => {
    // 
    
    try {
            const user = await User.findById(req.user.id).select("-password");

            // Check the user just in case
            if (!user)
            return res.status(404).json(error("User not found", res.statusCode));

            let insurance = await InsuranceCoverage.find({userid:user.id});
            
            res.status(200).json(success("View insurance",
                {
                    insurance
                },
                res.statusCode
            )
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).json(error("Server error", res.statusCode));
    }
};

exports.insuranceCoveragePost = async (req, res) => {
    const { typeofInsurance, description, contactPerson, contactNumber, userid } = req.body;
    try {
            let newEntry = new InsuranceCoverage({
                typeofInsurance,
                description,
                contactPerson,
                contactNumber,
                userid
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
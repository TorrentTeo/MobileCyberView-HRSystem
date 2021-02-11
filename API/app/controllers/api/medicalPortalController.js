const MedicalPlan = require("../../models/medicalPlan")
const ClinicList = require("../../models/clinicList")
const InsuranceCoverage = require("../../models/insuranceCoverage")
const User = require("../../models/User");
const LeaveApplication = require("../../models/leaveApplication");
const { success, error, validation } = require("../../helpers/responseApi");

exports.medicalLeaveGet = async (req, res) => {
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

exports.medicalLeaveGetById = async (req, res) => {    
    try {
            let leave = await LeaveApplication.findOne({
                _id:req.params._id
                });
            
            if (!leave)
            return res.status(404).json(error("Data not found", res.statusCode));
            res.status(200).json(success("View leave",
                {
                    leave
                },
                res.statusCode
            )
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).json(error("Server error", res.statusCode));
    }
};

exports.medicalLeaveGetAll = async (req, res) => {
    try {
            const leave = await LeaveApplication.find({
                reason: "Medical"
            });

            // Check the user just in case
            if (!leave)
            return res.status(404).json(error("Data not found", res.statusCode));
            
            res.status(200).json(success("View all medicalLeaves",
                {
                    leave
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

exports.medicalPlanGetById = async (req, res) => {    
    try {
            let medicalPlan = await MedicalPlan.findOne({
                _id:req.params._id
                });
            
            if (!medicalPlan)
            return res.status(404).json(error("Data not found", res.statusCode));
            res.status(200).json(success("View medicalPlan",
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

exports.medicalPlanGetAll = async (req, res) => {
    try {
            const medicalPlan = await MedicalPlan.find();

            if (!medicalPlan)
            return res.status(404).json(error("Data not found", res.statusCode));
            
            res.status(200).json(success("View all medicalPlans",
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
            console.log(userid)
            let username = [];
            for (i = 0; i < userid.length; i++) {
                var [user] = await User.find({_id: userid[i]})
                console.log(user)
                username.push(user.name)
              }
            let newEntry = new MedicalPlan({
                medicalPlanName,
                medicalCardFront,
                medicalCardBack,
                userid,
                name : username
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

exports.medicalPlanPut = async (req, res) => {
    try {   
        const { id, medicalPlanName, medicalCardFront, medicalCardBack} = req.body;
            //Update medicalplan
               let medicalplan = await MedicalPlan.findByIdAndUpdate(id,{
                    $set: { 
                        medicalPlanName:medicalPlanName, 
                        medicalCardFront:medicalCardFront, 
                        medicalCardBack:medicalCardBack
                    }
                });
                res.status(200).json(success("Edited successfully",
                {     }, res.statusCode
            )
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).json(error("Server error", res.statusCode));
    }
};

exports.medicalPlanDelete = async (req, res) => {
    try {   
            //Check whether the _id given is valid or not
            let medicalplan = await MedicalPlan.findOne({
                _id:req.params._id
            });
            if (!medicalplan) {
                return res.status(404).json(error("_id not found in Medical Plan", res.statusCode));
            }
            //Update medicalplan
                medicalplan = await MedicalPlan.findByIdAndRemove(medicalplan.id);
                res.status(200).json(success("Removed successfully",
                {    }, res.statusCode
            )
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).json(error("Server error", res.statusCode));
    }
};

exports.clinicListGet = async (req, res) => {
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

exports.clinicListGetById = async (req, res) => {    
    try {
            let clinicList = await ClinicList.findOne({
                _id:req.params._id
                });
            
            if (!clinicList)
            return res.status(404).json(error("Data not found", res.statusCode));
            
            res.status(200).json(success("View clinicList",
                {
                    clinicList
                },
                res.statusCode
            )
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).json(error("Server error", res.statusCode));
    }
};

exports.clinicListGetAll = async (req, res) => {
    try {
            const clinicList = await ClinicList.find();
            
            if (!clinicList)
            return res.status(404).json(error("Data not found", res.statusCode));
            
            res.status(200).json(success("View all clinicLists",
                {
                    clinicList
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
    const { clinicName, longitude, latitude, userid } = req.body;
    try {
            let username = [];
            for (i = 0; i < userid.length; i++) {
                var [user] = await User.find({_id: userid[i]})
                username.push(user.name)
              }
            let newEntry = new ClinicList({
                clinicName,
                longitude,
                latitude,
                userid,
                name: username
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

exports.clinicListPut = async (req, res) => {
    try {   
            const { id,clinicName,longitude,latitude } = req.body;
            //Update clinicList
                clinicList = await ClinicList.findByIdAndUpdate(id,{
                    $set: { 
                        clinicName:clinicName,
                        longitude:longitude,
                        latitude:latitude
                    }
                });
                res.status(200).json(success("Edited successfully",
                {     }, res.statusCode
            )
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).json(error("Server error", res.statusCode));
    }
};

exports.clinicListDelete = async (req, res) => {
    try {   
            //Check whether the _id given is valid or not
            let clinicList = await ClinicList.findOne({
                _id:req.params._id
            });
            if (!clinicList) {
                return res.status(404).json(error("_id not found in ClinicList", res.statusCode));
            }
            //Update clinicList
                clinicList = await ClinicList.findByIdAndRemove(clinicList.id);
                res.status(200).json(success("Removed successfully",
                {    }, res.statusCode
            )
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).json(error("Server error", res.statusCode));
    }
};

exports.insuranceCoverageGet = async (req, res) => {
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

exports.insuranceCoverageGetById = async (req, res) => {    
    try {
            let insurance = await InsuranceCoverage.findOne({
                _id:req.params._id
                });
            
            if (!insurance)
            return res.status(404).json(error("Data not found", res.statusCode));
            res.status(200).json(success("View insurance coverage",
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

exports.insuranceCoverageGetAll = async (req, res) => {
    try {
            const insurance = await InsuranceCoverage.find();

            if (!insurance)
            return res.status(404).json(error("Data not found", res.statusCode));
            
            res.status(200).json(success("View all insurance coverages",
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
            let username = [];
            for (i = 0; i < userid.length; i++) {
                var [user] = await User.find({_id: userid[i]})
                username.push(user.name)
              }
            let newEntry = new InsuranceCoverage({
                typeofInsurance,
                description,
                contactPerson,
                contactNumber,
                userid,
                name: username
            })
            await newEntry.save();   

            res.status(201).json(success("New record added successfully!",
                { newEntry }, res.statusCode )
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).json(error("Server error", res.statusCode));
    }
};

exports.insuranceCoveragePut = async (req, res) => {
    try {   
            const { id,typeofInsurance,description,contactPerson,contactNumber } =req.body;
            //Update insuranceCoverage
                insuranceCoverage = await InsuranceCoverage.findByIdAndUpdate(id,{
                    $set: { 
                        typeofInsurance:typeofInsurance,
                        description:description,
                        contactPerson:contactPerson,
                        contactNumber:contactNumber
                    }
                });
                res.status(200).json(success("Edited successfully",
                {     }, res.statusCode
            )
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).json(error("Server error", res.statusCode));
    }
};

exports.insuranceCoverageDelete = async (req, res) => {
    try {   
            //Check whether the _id given is valid or not
            let insuranceCoverage = await InsuranceCoverage.findOne({
                _id:req.params._id
            });
            if (!insuranceCoverage) {
                return res.status(404).json(error("_id not found in InsuranceCoverage", res.statusCode));
            }
            //Update insuranceCoverage
                insuranceCoverage = await InsuranceCoverage.findByIdAndRemove(insuranceCoverage.id);
                res.status(200).json(success("Removed successfully",
                {    }, res.statusCode
            )
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).json(error("Server error", res.statusCode));
    }
};
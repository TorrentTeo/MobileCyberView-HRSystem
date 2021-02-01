const router = require("express").Router();
const { dashboard, attendance, getAttendanceCode } = require("../../app/controllers/api/employeeController");

// Controllers
const { getAuthenticatedUser } = require("../../app/controllers/api/employeeController");
const { feedbackPost } = require("../../app/controllers/api/feedbackController");
const { clientContractPost } = require("../../app/controllers/api/clientContractController");
const { submitMCPost } = require("../../app/controllers/api/calendarController");
const { rewardPost, rewardGetAll, rewardPut, rewardDelete, } = require("../../app/controllers/api/rewardController");
const { accountGetById, accountGetAll, accountDelete } = require("../../app/controllers/api/accountController");
const { medicalLeaveGetAll,
        medicalPlanGetAll, medicalPlanPost, medicalPlanPut, medicalPlanDelete, 
        clinicListGetAll, clinicListPost, clinicListPut, clinicListDelete, 
        insuranceCoverageGetAll, insuranceCoveragePost, insuranceCoveragePut, insuranceCoverageDelete} = require("../../app/controllers/api/medicalPortalController");

// Middleware
const { auth, adminOnly } = require("../../app/middlewares/auth");

// Routes
router.get("/", auth, dashboard);
router.post("/Attendance", auth, attendance);
router.get("/Attendance", auth, getAttendanceCode);

//feedback routes
router.post("/feedback", auth, feedbackPost);
//router.get("/feedback", auth, feedbackGet);
//router.put("/feedback", auth, feedbackPut);
//router.delete("/feedback", auth, feedbackDelete);

//clientroutes
router.post("/clientcontract", auth, clientContractPost);
//router.get("/clientcontract", auth, clientContractGet);
//router.put("/clientcontract", auth, clientContractPut);
//router.delete("/clientcontract", auth, clientContractDelete);

//calendar route
//router.get("/calendar", auth, )

//reward routes with wallet
router.post("/reward", auth, adminOnly, rewardPost);
router.get("/allReward", auth, adminOnly, rewardGetAll);
router.put("/reward/:_id", auth, adminOnly, rewardPut);
router.delete("/reward/:_id", auth, adminOnly, rewardDelete);

//account routes
router.get("/account/:_id", auth, adminOnly, accountGetById);
router.get("/allAccount/", auth, adminOnly, accountGetAll);
router.delete("/account/:_id", auth, adminOnly, accountDelete);

//medical portal routes
router.get("/allMedicalLeave", auth, adminOnly, medicalLeaveGetAll);

router.get("/allMedicalPlan", auth, adminOnly, medicalPlanGetAll);
router.post("/medicalPlan", auth, adminOnly, medicalPlanPost);
router.put("/medicalPlan/:_id", auth, adminOnly, medicalPlanPut);
router.delete("/medicalPlan/:_id", auth, adminOnly, medicalPlanDelete);

router.get("/allClinicList", auth, adminOnly, clinicListGetAll);
router.post("/clinicList", auth, adminOnly, clinicListPost);
router.put("/clinicList/:_id", auth, adminOnly, clinicListPut);
router.delete("/clinicList/:_id", auth, adminOnly, clinicListDelete);

router.get("/allInsuranceCoverage", auth, adminOnly, insuranceCoverageGetAll);
router.post("/insuranceCoverage", auth, adminOnly, insuranceCoveragePost);
router.put("/insuranceCoverage/:_id", auth, adminOnly, insuranceCoveragePut);
router.delete("/insuranceCoverage/:_id", auth, adminOnly, insuranceCoverageDelete);
//end of medical portal routes

//leave Route
//router.post("/leave", auth)
//router.get("/leave", auth, )


module.exports = router;
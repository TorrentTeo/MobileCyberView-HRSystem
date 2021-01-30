const router = require("express").Router();
const { dashboard, attendance, getAttendanceCode } = require("../../app/controllers/api/employeeController");

// Controllers
const { getAuthenticatedUser } = require("../../app/controllers/api/employeeController");
const { feedbackPost } = require("../../app/controllers/api/feedbackController");
const { clientContractPost } = require("../../app/controllers/api/clientContractController");
const { profilePost, profileGet, profileGetById, profilePut, profileDelete } = require("../../app/controllers/api/profileController");
const { submitMCPost } = require("../../app/controllers/api/calendarController");
const { rewardPost, rewardGet, rewardGetById, rewardPut, rewardDelete, walletGet } = require("../../app/controllers/api/rewardController");
const { accountGet, accountPut, accountDelete } = require("../../app/controllers/api/accountController");
const { medicalLeavePut, medicalLeaveGet, medicalLeaveDelete, medicalPlanGet, medicalPlanPost, clinicListGet, clinicListPost, insuranceCoverageGet, insuranceCoveragePost } = require("../../app/controllers/api/medicalPortalController");

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

//profile routes
router.post("/profile", auth, profilePost);
router.get("/profile", auth, profileGet);
router.get("/profile/:_id", auth, profileGetById);
router.put("/profile/:_id", auth, profilePut);
router.delete("/profile/:_id", auth, profileDelete);

//calendar route
//router.get("/calendar", auth, )

//reward routes with wallet
router.post("/reward", adminOnly, rewardPost);
router.get("/reward", auth, rewardGet);
router.get("/reward/:_id", auth, rewardGetById);
router.put("/reward/:_id", adminOnly, rewardPut);
router.delete("/reward/:_id", adminOnly, rewardDelete);
router.get("/wallet", auth, walletGet);

//account routes
router.get("/account", auth, accountGet);
router.put("/account/:_id", auth, accountPut);
router.delete("/account/:_id", adminOnly, accountDelete);

//medical portal routes
router.put("/medicalLeave/:_id", auth, medicalLeavePut);
router.get("/medicalLeave", auth, medicalLeaveGet);
router.delete("/medicalLeave/:_id", auth, medicalLeaveDelete);

router.get("/medicalPlan", auth, medicalPlanGet);
router.post("/medicalPlan", adminOnly, medicalPlanPost);
//router.put("/medicalPlan/:_id", adminOnly, medicalPlanPut);
//router.delete("/medicalPlan/:_id", adminOnly, medicalPlanDelete);

router.get("/clinicList", auth, clinicListGet);
router.post("/clinicList", adminOnly, clinicListPost);
//router.put("/clinicList/:_id", adminOnly, clinicListPut);
//router.delete("/clinicList/:_id", adminOnly, clinicListDelete);

router.get("/insuranceCoverage", auth, insuranceCoverageGet);
router.post("/insuranceCoverage", adminOnly, insuranceCoveragePost);
//router.put("/insuranceCoverage/:_id", adminOnly, insuranceCoveragePut);
//router.delete("/insuranceCoverage/:_id", adminOnly, insuranceCoverageDelete);
//end of medical portal routes

//leave Route
//router.post("/leave", auth)
//router.get("/leave", auth, )


module.exports = router;
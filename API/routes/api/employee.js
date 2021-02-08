const router = require("express").Router();
const { dashboard, attendance, getAttendanceCode, putAttendance } = require("../../app/controllers/api/employeeController");

// Controllers
const { getAuthenticatedUser, } = require("../../app/controllers/api/employeeController");
const { postFeedback } = require("../../app/controllers/api/feedbackController");
const { clientContractPost } = require("../../app/controllers/api/clientContractController");
const { profilePost, profileGet, profileGetById, profilePut, profileDelete } = require("../../app/controllers/api/profileController");
const { submitMCPost } = require("../../app/controllers/api/calendarController");
const { rewardGet, rewardGetById, walletGet } = require("../../app/controllers/api/rewardController");
const { accountGet, accountPut } = require("../../app/controllers/api/accountController");
const { getAllLeave, getLeave, postLeave, putLeave, deleteLeave } = require("../../app/controllers/api/leaveController");
const { medicalLeavePut, medicalLeaveGet, medicalLeaveGetById, medicalLeaveDelete, 
        medicalPlanGet, medicalPlanGetById, 
        clinicListGet, clinicListGetById,  
        insuranceCoverageGet, insuranceCoverageGetById } = require("../../app/controllers/api/medicalPortalController");
const {getCalendar, postCalendar, putCalendar, deleteCalendar, getAllCalendar} = require("../../app/controllers/api/calendarController")
const {feedGetById, feedGet} = require("../../app/controllers/api/feedController")

// Middleware
const { auth, adminOnly } = require("../../app/middlewares/auth");

// Routes
router.get("/", auth, dashboard);

router.post("/Attendance", auth, attendance);
router.get("/Attendance", auth, getAttendanceCode);
router.put("/Attendance", auth, putAttendance);

//feedback routes
router.post("/feedback", auth, postFeedback);
//router.get("/feedback", auth, feedbackGet);
//router.put("/feedback", auth, feedbackPut);
//router.delete("/feedback", auth, feedbackDelete);

//clientroutes
router.post("/clientcontract", auth, clientContractPost);
//router.get("/clientcontract", auth, clientContractGet);
//router.put("/clientcontract", auth, clientContractPut);
//router.delete("/clientcontract", auth, clientContractDelete);

//calendar route
router.get("/calendar", auth, getCalendar)
router.get("/allcalendar", auth, getAllCalendar)
// router.post("/calendar", auth, postCalendar)
// router.put("/calendar", auth, putCalendar)
router.delete("/calendar", auth, deleteCalendar)

//profile routes
router.post("/profile", auth, profilePost);
router.get("/profile", auth, profileGet);
router.get("/profile/:_id", auth, profileGetById);
router.put("/profile", auth, profilePut);
router.delete("/profile/:_id", auth, profileDelete);

//reward routes with wallet
router.get("/reward", auth, rewardGet);
router.get("/reward/:_id", auth, rewardGetById);
router.get("/wallet", auth, walletGet);

//account routes
router.get("/account", auth, accountGet);
router.put("/account", auth, accountPut);

//medical portal routes
router.put("/medicalLeave/:_id", auth, medicalLeavePut);
router.get("/medicalLeave", auth, medicalLeaveGet);
router.get("/medicalLeave/:_id", auth, medicalLeaveGetById);
router.delete("/medicalLeave/:_id", auth, medicalLeaveDelete);

router.get("/medicalPlan", auth, medicalPlanGet);
router.get("/medicalPlan/:_id", auth, medicalPlanGetById);

router.get("/clinicList", auth, clinicListGet);
router.get("/clinicList/:_id", auth, clinicListGetById);

router.get("/insuranceCoverage", auth, insuranceCoverageGet);
router.get("/insuranceCoverage/:_id", auth, insuranceCoverageGetById);
//end of medical portal routes

//leave Route
router.post("/leave", auth, postLeave)
router.get("/leave", auth, getLeave)
router.put("/leave", auth, putLeave)
router.delete("/leave", auth, deleteLeave)

//Feed route
router.get("/feed", auth, feedGet);
router.get("/feed/:_id", auth, feedGetById);


module.exports = router;
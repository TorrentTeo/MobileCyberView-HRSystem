const router = require("express").Router();
const { dashboard, attendance, getAttendanceCode } = require("../../app/controllers/api/employeeController");

// Controllers
const { getAuthenticatedUser } = require("../../app/controllers/api/employeeController");
const { feedbackPost } = require("../../app/controllers/api/feedbackController");
const { clientContractPost } = require("../../app/controllers/api/clientContractController");
const { profilePost } = require("../../app/controllers/api/profileController");
const { submitMCPost } = require("../../app/controllers/api/calendarController");
// Middleware
const { auth } = require("../../app/middlewares/auth");

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
//router.get("/profile", auth, profileGet);
//router.put("/profile", auth, profilePut);
//router.delete("/profile", auth, profileDelete);

//calendar route
//router.get("/calendar", auth, )




//leave Route
//router.post("/leave", auth)
//router.get("/leave", auth, )


module.exports = router;
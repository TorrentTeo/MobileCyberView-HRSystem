const router = require("express").Router();
const { dashboard, attendance } = require("../../app/controllers/api/employeeController");

// Controllers
const { getAuthenticatedUser } = require("../../app/controllers/api/employeeController");

// Middleware
const {auth} = require("../../app/middlewares/auth");

// Routes
router.get("/", auth, dashboard);
router.post("/Attendance", auth, attendance);
module.exports = router;
const router = require("express").Router();

// Controllers
const {
  createNew
} = require("../../app/controllers/api/profileController");

// Middleware
const {auth} = require("../../app/middlewares/auth");
// Routes
router.post("/createNew", auth, createNew);
module.exports = router;
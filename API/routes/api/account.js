const router = require("express").Router();

// Controllers
const {
  viewAccount,
  editAccount
} = require("../../app/controllers/api/accountController");

// Middleware
const {auth} = require("../../app/middlewares/auth");
// Routes
router.get("/", auth, viewAccount);
router.post("/edit", auth, editAccount);

module.exports = router;
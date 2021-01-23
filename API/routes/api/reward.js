const router = require("express").Router();

// Controllers
const {
    newReward,
    viewReward,
    viewWallet
} = require("../../app/controllers/api/rewardController");

// Middleware
const {auth} = require("../../app/middlewares/auth");
// Routes
router.post("/newreward", auth, newReward);
router.get("/", auth, viewReward);
router.get("/wallet", auth, viewWallet);
module.exports = router;
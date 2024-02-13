const express = require("express");
const router = express.Router();
const {homePage} = require("../controllers/general");
const { deserializeUser } = require("../middlewares/deserializeUser");

router.get("/home", deserializeUser , homePage);

module.exports = router;
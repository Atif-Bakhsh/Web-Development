const express = require("express");
const { getStatsController } = require("../controller/statsController");
const router = express.Router();

router.get("/getStats", getStatsController);

module.exports = router;

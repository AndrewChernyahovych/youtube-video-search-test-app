const express = require("express");
const {
  getVideoListHandler,
  getHistoryHandler,
  getAnalyticsHandler,
} = require("../controllers/video.controller");
const videoRouter = express.Router();

videoRouter.get("/search", getVideoListHandler);
videoRouter.get("/history", getHistoryHandler);
videoRouter.get("/analytics", getAnalyticsHandler);


module.exports = videoRouter;

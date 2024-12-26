const express = require("express");
const {
  getVideoListHandler,
  getHistoryHandler,
  getAnalyticsHandler,
  getVideoDetailsHandler,
} = require("../controllers/video.controller");
const videoRouter = express.Router();

videoRouter.get("/search", getVideoListHandler);
videoRouter.get("/history", getHistoryHandler);
videoRouter.get("/analytics", getAnalyticsHandler);
videoRouter.get("/:id", getVideoDetailsHandler);


module.exports = videoRouter;

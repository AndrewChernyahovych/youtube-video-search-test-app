const express = require("express");
const {
  getVideoListHandler,
  getHistoryHandler,
} = require("../controllers/video.controller");
const videoRouter = express.Router();

videoRouter.get("/search", getVideoListHandler);
videoRouter.get("/history", getHistoryHandler);

module.exports = videoRouter;

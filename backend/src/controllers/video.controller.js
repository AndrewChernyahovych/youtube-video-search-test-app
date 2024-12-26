const {
  saveQuery,
  getVideos,
  getHistory,
  getAnalytics,
  getVideoDetails,
} = require("../services/video.service");
const { sendSuccessResponse, sendErrorResponse } = require("../utils/helpers")

const getVideoListHandler = async (req, res) => {
    const data = req.query;
  try {
      await saveQuery(data.query);
      const videoList = await getVideos(data);
    return sendSuccessResponse(res, videoList, 200);
  } catch (error) {
    return sendErrorResponse(res, error.message, 400);
  }
};

const getHistoryHandler = async (req, res) => {
  try {
    const history = await getHistory();
    return sendSuccessResponse(res, { history }, 200);
  } catch (error) {
    return sendErrorResponse(res, error.message, 400);
  }
};

const getAnalyticsHandler = async (req, res) => {
  try {
    const analytics = await getAnalytics();
    return sendSuccessResponse(res, { analytics }, 200);
  } catch (error) {
    return sendErrorResponse(res, error.message, 400);
  }
};

const getVideoDetailsHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const video = await getVideoDetails(id);
    return sendSuccessResponse(res, video, 200);
  } catch (error) {
    return sendErrorResponse(res, error.message, 400);
  }
};

module.exports = {
  getVideoListHandler,
  getHistoryHandler,
  getAnalyticsHandler,
  getVideoDetailsHandler,
};

const axios = require("axios");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const { VIDEO_BASE_URL } = require("../utils/constants");
const key = process.env.YOUTUBE_API_KEY;

const saveQuery = async (query) => {
  try {
    await prisma.searchQuery.create({
      data: { query },
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

const getVideos = async (data) => {
  const { query, pageToken, maxResults } = data;
  try {
    const response = await axios.get(
      `${VIDEO_BASE_URL}/search?key=${key}&type=video&part=snippet&q=${query}&maxResults=${maxResults}&${
        pageToken || ""
      }`
    );
    const results = response.data.items.map((item) => ({
      videoId: item.id.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnailUrl: item.snippet.thumbnails.default.url,
      publishedAt: item.snippet.publishedAt,
    }));

    const formattedResponse = {
      results: results,
      totalResults: response.data.pageInfo.totalResults,
      nextPageToken: response.data.nextPageToken || null,
      prevPageToken: response.data.prevPageToken || null,
    };

    return formattedResponse;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getHistory = async () => {
  try {
    const history = await prisma.searchQuery.findMany();
    const formattedHistory = history.map((item) => ({
      query: item.query,
      timestamp: item.createdAt.toISOString(),
    }));
    return formattedHistory;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAnalytics = async () => {
  try {
    const result = await prisma.searchQuery.groupBy({
      by: ["query"],
      _count: {
        query: true,
      },
      orderBy: {
        _count: {
          query: "desc",
        },
      },
    });

    const analytics = result.map((item) => ({
      query: item.query,
      count: item._count.query,
    }));

    return analytics;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getVideoDetails = async (id) => {
  try {
    const response = await axios.get(
      `${VIDEO_BASE_URL}/videos?key=${key}&id=${id}&part=snippet,statistics`
    );
    if (response.data.items && response.data.items.length > 0) {
      const video = response.data.items[0];
      const videoDetails = {
        videoId: video.id,
        title: video.snippet.title,
        description: video.snippet.description,
        thumbnailUrl: video.snippet.thumbnails.high.url,
        publishedAt: video.snippet.publishedAt,
        viewCount: video.statistics.viewCount,
        likeCount: video.statistics.likeCount,
        commentCount: video.statistics.commentCount,
      };

      return videoDetails;
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  saveQuery,
  getVideos,
  getHistory,
  getAnalytics,
  getVideoDetails,
};

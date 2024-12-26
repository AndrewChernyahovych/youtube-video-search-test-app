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
      `${VIDEO_BASE_URL}/search?key=${key}&type=video&part=snippet&q=${query}&maxResults=${maxResults}`
    );
    //&pageToken=${pageToken}
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

module.exports = {
  saveQuery,
  getVideos,
  getHistory,
};

import axios from "axios";
import { PrismaClient } from "@prisma/client";
import { VIDEO_BASE_URL } from "../utils/constants";

const prisma = new PrismaClient();
const key = process.env.YOUTUBE_API_KEY as string;

interface VideoQueryData {
  query: string;
  pageToken?: string;
  maxResults?: number;
}

interface VideoDetails {
  videoId: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  publishedAt: string;
  viewCount?: string;
  likeCount?: string;
  commentCount?: string;
}

interface VideoResponse {
  results: VideoDetails[];
  totalResults: number;
  nextPageToken: string | null;
  prevPageToken: string | null;
}

export const saveQuery = async (query: string): Promise<void> => {
  try {
    await prisma.searchQuery.create({
      data: { query },
    });
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getVideos = async (data: VideoQueryData): Promise<VideoResponse> => {
  const { query, pageToken, maxResults } = data;
  try {
    const response = await axios.get(
      `${VIDEO_BASE_URL}/search?key=${key}&type=video&part=snippet&q=${query}&maxResults=${maxResults}&${
        pageToken || ""
      }`
    );

    const results: VideoDetails[] = response.data.items.map((item: any) => ({
      videoId: item.id.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnailUrl: item.snippet.thumbnails.default.url,
      publishedAt: item.snippet.publishedAt,
    }));

    const formattedResponse: VideoResponse = {
      results,
      totalResults: response.data.pageInfo.totalResults,
      nextPageToken: response.data.nextPageToken || null,
      prevPageToken: response.data.prevPageToken || null,
    };

    return formattedResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getHistory = async (): Promise<{ query: string; timestamp: string }[]> => {
  try {
    const history = await prisma.searchQuery.findMany();
    const formattedHistory = history.map((item) => ({
      query: item.query,
      timestamp: item.createdAt.toISOString(),
    }));
    return formattedHistory;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getAnalytics = async (): Promise<{ query: string; count: number }[]> => {
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
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getVideoDetails = async (id: string): Promise<VideoDetails | null> => {
  try {
    const response = await axios.get(
      `${VIDEO_BASE_URL}/videos?key=${key}&id=${id}&part=snippet,statistics`
    );

    if (response.data.items && response.data.items.length > 0) {
      const video = response.data.items[0];
      const videoDetails: VideoDetails = {
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

    return null;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

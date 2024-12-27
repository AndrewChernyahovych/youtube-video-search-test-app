import { Request, Response } from "express";
import { 
  saveQuery, 
  getVideos, 
  getHistory, 
  getAnalytics, 
  getVideoDetails 
} from "../services/video.service";
import { sendSuccessResponse, sendErrorResponse } from "../utils/helpers";


interface VideoQueryData {
  query: string;
  pageToken?: string;
  maxResults?: number;
}

export const getVideoListHandler = async (req: Request<{}, {}, {}, VideoQueryData>, res: Response): Promise<Response> => {
  const data = req.query;

  try {
    if (!data.query) {
      throw new Error("The 'query' parameter is required.");
    }

    await saveQuery(data.query);
    const videoList = await getVideos(data);
    return sendSuccessResponse(res, videoList, 200);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "An unknown error occurred.";
    return sendErrorResponse(res, message, 400);
  }
};

export const getHistoryHandler = async (req: Request, res: Response): Promise<Response> => {
  try {
    const history = await getHistory();
    return sendSuccessResponse(res, { history }, 200);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "An unknown error occurred.";
    return sendErrorResponse(res, message, 400);
  }
};

export const getAnalyticsHandler = async (req: Request, res: Response): Promise<Response> => {
  try {
    const analytics = await getAnalytics();
    return sendSuccessResponse(res, { analytics }, 200);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "An unknown error occurred.";
    return sendErrorResponse(res, message, 400);
  }
};

export const getVideoDetailsHandler = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;

  try {
    const video = await getVideoDetails(id);

    if (!video) {
      return sendErrorResponse(res, "Video not found", 404);
    }

    return sendSuccessResponse(res, video, 200);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "An unknown error occurred.";
    return sendErrorResponse(res, message, 400);
  }
};

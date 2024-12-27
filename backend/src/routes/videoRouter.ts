import { Router, Request, Response } from "express";
import { 
  getVideoListHandler, 
  getHistoryHandler, 
  getAnalyticsHandler, 
  getVideoDetailsHandler 
} from "../controllers/video.controller";

const videoRouter: Router = Router();

videoRouter.get("/search", getVideoListHandler);
videoRouter.get("/history", getHistoryHandler);
videoRouter.get("/analytics", getAnalyticsHandler);
videoRouter.get("/:id", getVideoDetailsHandler);

export default videoRouter;

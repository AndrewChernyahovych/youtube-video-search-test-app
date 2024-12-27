import { Response } from "express";

interface SuccessResponse {
  success: true;
  [key: string]: any;
}

interface ErrorResponse {
  success: false;
  error?: string;
  [key: string]: any;
}

export const sendSuccessResponse = (
  res: Response,
  data: string | Record<string, any>,
  status: number = 200
): Response<SuccessResponse> => {
  let responseData: Record<string, any>;

  if (typeof data === "string") {
    responseData = { message: data };
  } else {
    responseData = { ...data };
  }

  return res.status(status).json({ success: true, ...responseData });
};

export const sendErrorResponse = (
  res: Response,
  errorMessage: string | Record<string, any>,
  status: number = 500
): Response<ErrorResponse> => {
  let errorResponse: Record<string, any>;

  if (typeof errorMessage === "string") {
    errorResponse = { error: errorMessage };
  } else {
    errorResponse = { ...errorMessage };
  }

  return res.status(status).json({ success: false, ...errorResponse });
};

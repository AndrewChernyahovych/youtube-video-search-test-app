const sendSuccessResponse = (res, data, status = 200) => {
  let responseData;
  if (typeof data === "string") {
    responseData = { message: data };
  } else {
    responseData = { ...data };
  }
  return res.status(status).json({ success: true, ...responseData });
};

const sendErrorResponse = (res, errorMessage, status = 500) => {
  let errorResponse;
  if (typeof errorMessage === "string") {
    errorResponse = { error: errorMessage };
  } else {
    errorResponse = { ...errorMessage };
  }
  return res.status(status).json({ success: false, ...errorResponse });
};

module.exports = {
  sendSuccessResponse,
  sendErrorResponse,
};
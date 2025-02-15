// Helper function to send error responses
export function sendError(res, message, statusCode = 500) {
    res.status(statusCode).json({
      success: false,
      message: message,
    });
  }
  
  // Helper function to send success responses
export function sendSuccess(res, message, data = null) {
    res.status(200).json({
      success: true,
      message: message,
      data: data,
    });
  }
  

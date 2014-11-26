/**
 * Lead Author: Ryan
 *
 * Helper functions to send JSON responses back to client.
 */

/**
 * Send a success response to the client.
 *
 * @param res - The response object
 * @param message - A message describing the response
 * @param content - The actual data of the response.
 */
var send_success_response = function(res, message, content) {
  res.status(200).json({
    success: true,
    message: message,
    content: content
  });
};

/**
 * Send a failure response to the client (i.e. their request was invalid or violated the system
 * constraints).
 *
 * @param res - The response object
 * @param code -  The HTTP code to send to the client.
 * @param message - The error message to send to the client. 
 */
var send_failure_response = function(res, code, message) {
  res.status(code).json({
    "success": false,
    "message": message
  });
};

/**
 * Send a failure response due to a server error.
 *
 * @param res - The response object.
 * @param err - The error object to send down to the client.
 */
var send_failure_response_from_error = function(res, err) {
  var message = 'The server returned an error: ' + err.message;
  send_failure_response(res, 500, message);
};

module.exports = {
  success: send_success_response,
  failure: send_failure_response,
  error: send_failure_response_from_error
};

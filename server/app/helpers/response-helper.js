
var send_success_response = function(res, message, content) {
  res.status(200).json({
    success: true,
    message: message,
    content: content
  });
};

var send_failure_response = function(res, code, message) {
  res.status(code).json({
    success: false,
    message: message
  });
};

var send_failure_response_from_error = function(res, err) {
  var message = 'The server returned an error: ' + err.message;
  send_failure_response(res, 500, message);
  console.log(err);
};

module.exports = {
  success: send_success_response,
  failure: send_failure_response,
  error: send_failure_response_from_error
};

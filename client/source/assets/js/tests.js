// If true, the tests will be run instead of the app. If false, then the app will run as normal.
Menyou.shouldTest = false;

$(document).ready(function() {
  if (!Menyou.shouldTest) {
    $("#qunit").remove();
  }
});

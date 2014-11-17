/**
 *
 */

Menyou = Menyou || {};
Menyou.APIHelper = {};

/**
 *
 */
Menyou.APIHelper.getToken = function(username, password, callback) {
  $.ajax({
    url: '/api/auth/token',
    type: 'POST',
    headers: {
      'Accept': 'appliction/json; charset=utf-8',
      'Content-Type': 'application/json; charset=utf-8'
    },
    data: JSON.stringify({
      username: username,
      password: password
    }),
    statusCode: Menyou.APIHelper.responseHandlers(callback)
  });
};

/**
 *
 */
Menyou.APIHelper.register = function(username, password, callback) {
  $.ajax({
    url: '/api/auth/register',
    type: 'POST',
    headers: {
      'Accept': 'appliction/json; charset=utf-8',
      'Content-Type': 'application/json; charset=utf-8'
    },
    data: JSON.stringify({
      username: username,
      password: password
    }),
    statusCode: Menyou.APIHelper.responseHandlers(callback)
  });
};

/**
 *
 */
Menyou.APIHelper.validateToken = function(token, callback) {
  $.ajax({
    url: '/api/auth/validate',
    type: 'GET',
    headers: {
      'Accept': 'appliction/json; charset=utf-8',
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': 'Bearer ' + token
    },
    statusCode: Menyou.APIHelper.responseHandlers(callback)
  });
};

/**
 *
 */
Menyou.APIHelper.getDishes = function(token, callback) {
  $.ajax({
    url: '/api/dishes',
    type: 'GET',
    headers: {
      'Accept': 'appliction/json; charset=utf-8',
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': 'Bearer ' + token
    },
    statusCode: Menyou.APIHelper.responseHandlers(callback)
  });
};

/**
 *
 */
Menyou.APIHelper.getTasteProfile = function(token, callback) {
  $.ajax({
    url: '/api/taste',
    type: 'GET',
    headers: {
      'Accept': 'appliction/json; charset=utf-8',
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': 'Bearer ' + token
    },
    statusCode: Menyou.APIHelper.responseHandlers(callback)
  });
};

/**
 *
 */
Menyou.APIHelper.updateTasteProfile = function(add, remove, token, callback) {
  $.ajax({
    url: '/api/taste',
    type: 'PUT',
    headers: {
      'Accept': 'appliction/json; charset=utf-8',
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': 'Bearer ' + token
    },
    data: JSON.stringify({
      add: add,
      remove: remove
    }),
    statusCode: Menyou.APIHelper.responseHandlers(callback)
  });
};

/**
 *
 */
Menyou.APIHelper.responseHandlers = function(callback) {
  return {
    200: function(data) {
      console.log('OKAY');
      console.log(data);
      callback(data);
    },
    304: function(jqxhr) {
      console.log('NOT CHANGED');
      console.log(jqxhr);
    },
    401: function(jqxhr) {
      console.log('NOT AUTHORIZED');
      console.log(jqxhr);
    },
    404: function(jqxhr) {
      console.log('NOT FOUND');
      console.log(jqxhr);
    },
    500: function(jqxhr) {
      console.log('INTERNAL SERVER ERROR')
      console.log(jqxhr);
    }
  };
};

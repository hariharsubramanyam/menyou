
var Menyou = {};

Menyou.getToken(username, password, callback) {
  // POST /api/token
  $.ajax({
    url: '/api/token',
    type: 'POST',
    headers: {
      'Accept': 'appliction/json; charset=utf-8',
      'Content-Type': 'application/json; charset=utf-8'
    },
    data: JSON.stringify({
      username: username,
      password: password
    })
  });
};

Menyou.register(username, password, callback) {
  // POST /api/register
  $.ajax({
    url: '/api/register',
    type: 'POST',
    headers: {
      'Accept': 'appliction/json; charset=utf-8',
      'Content-Type': 'application/json; charset=utf-8'
    },
    data: JSON.stringify({
      username: username,
      password: password
    })
  });
};

Menyou.validateToken(callback) {
  // GET /api/validate
  $.ajax({
    url: '/api/validate',
    type: 'GET',
    headers: {
      'Accept': 'appliction/json; charset=utf-8',
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': 'Bearer ' + Menyou.token
      // TODO: implement a cookie-based session store
    }
  });
};

Menyou.getDishes(callback) {
  // GET /api/dishes/
  $.ajax({
    url: '/api/token',
    type: 'POST',
    headers: {
      'Accept': 'appliction/json; charset=utf-8',
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': 'Bearer ' + Menyou.token
    }
  });
};

Menyou.getTasteProfile(callback) {
  // GET /api/taste/
  $.ajax({
    url: '/api/token',
    type: 'POST',
    headers: {
      'Accept': 'appliction/json; charset=utf-8',
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': 'Bearer ' + Menyou.token
    }
  });
};

Menyou.updateTasteProfile(add, remove, callback) {
  // PUT /api/taste/
  $.ajax({
    url: '/api/token',
    type: 'POST',
    headers: {
      'Accept': 'appliction/json; charset=utf-8',
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': 'Bearer ' + Menyou.token
    },
    data: JSON.stringify({
      add: add,
      remove: remove
    }),
    statusCode: {
      200: function(data) {
        console.log('OKAY');
      },
      304: function(jqxhr) {
        console.log('NOT CHANGED');
      },
      401: function(jqxhr) {
        console.log('NOT AUTHORIZED');
      },
      404: function(jqxhr) {
        console.log('NOT FOUND');
      },
      500: function(jqxhr) {
        console.log('INTERNAL SERVER ERROR')
      }
    }
  });
};

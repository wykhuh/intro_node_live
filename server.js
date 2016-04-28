var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

// =======================
// routes
// =======================

app.get('/', function (request, response) {
  response.render('home', { title: 'My Site' });
});

// =======================
// server
// =======================

app.listen(port, function () {
  console.log('Server is running on ' + port);
});

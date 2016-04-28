var express = require('express');
var app = express();
var exphbs = require('express-handlebars');
var port = process.env.PORT || 3000;

// =======================
// middleware & config
// =======================
app.set('views', 'views');

app.engine('hbs', exphbs({
  extname: 'hbs',
  defaultLayout: 'main',
  layoutsDir: './views/layouts'
}));

app.set('view engine', 'hbs');

// =======================
// routes
// =======================

app.get('/', function (request, response) {
  response.render('home', { title: 'My Site' });
});

app.get('/projects', function (request, response) {
  response.render('projects', { title: 'My Projects' });
});


// =======================
// server
// =======================

app.listen(port, function () {
  console.log('Server is running on ' + port);
});

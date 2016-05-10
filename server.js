var express = require('express');
var app = express();
var exphbs = require('express-handlebars');
var axios = require('axios');
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

app.use(express.static('public'));

// =======================
// routes
// =======================

app.get('/', function (request, response) {
  var favoriteLetters = ['a', 'b', 'c'];
  var favoriteLinks = [
    { text: 'Apple', url: 'http://apple.com' },
    { text: 'Facebook', url: 'http://facebook.com' }
  ];

  response.render('home', {
    title: 'My Site',
    favorites: favoriteLetters,
    links: favoriteLinks
  });
});

app.get('/projects', function (request, response) {
  var options = {
    headers: {
      'User-Agent': 'wykhuh'
    }
  };

  axios.get('https://api.github.com/users/wykhuh', options)
    .then(function (results) {
      console.log(results.data);
    });

  response.render('projects', { title: 'My Projects' });
});


// =======================
// server
// =======================

app.listen(port, function () {
  console.log('Server is running on ' + port);
});

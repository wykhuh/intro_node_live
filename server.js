var express = require('express');
var app = express();
var exphbs = require('express-handlebars');
var githubService = require('./services/githubService.js');
var port = process.env.PORT || 3000;

// =======================
// middleware & config
// =======================
app.set('views', 'views');

app.engine('hbs', exphbs({
  extname: 'hbs',
  defaultLayout: 'main',
  layoutsDir: './views/layouts',
  helpers: {
    json: function (context) {
      return JSON.stringify(context);
    }
  }
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
  githubService.githubInfo()
    .then(function (results) {
      response.render('projects',
        {
          title: 'My Projects',
          bio: results.bio,
          repos: results.repos
        }
      );
    })
    .catch(function (err) {
      console.log('err: ', err);
    });
});

app.get('/projects/:id', function (request, response) {
  var currentProjectName = request.params.id;
  response.render('project',
    {
      title: 'My Projects: ' + currentProjectName,
      project: { name: currentProjectName }
    }
 );
});


// =======================
// server
// =======================

app.listen(port, function () {
  console.log('Server is running on ' + port);
});

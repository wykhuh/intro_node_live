var express = require('express');
var app = express();
var exphbs = require('express-handlebars');
var githubService = require('./services/githubService.js');
var projectInfoService = require('./services/projectInfoService.js');
var moment = require('moment');

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
    },
    formatDate: function (date, format) {
      return moment(date).format(format);
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
  var username = 'wykhuh';

  githubService.githubInfo(username)
    .then(function (results) {
      var repos = results.repos;
      repos.forEach(function (repo, index) {
        repos[index].hasPost = projectInfoService.fileExists(repo.name);
      });

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

app.get('/projects/:id', function (req, res) {
  var currentProjectName = req.params.id;
  var currentProject = {};

  projectInfoService.readFile(currentProjectName, function (err, results) {
    if (err) {
      currentProject = {
        post: currentProjectName + ' is invalid project name.'
      };
    } else {
      currentProject = {
        name: currentProjectName,
        post: results,
        url: 'https://github.com/your_username/' + currentProjectName
      };
    }

    res.render('project', {
      title: 'My Project: ' + currentProjectName,
      project: currentProject
    });
  });
});

// =======================
// server
// =======================

app.listen(port, function () {
  console.log('Server is running on ' + port);
});

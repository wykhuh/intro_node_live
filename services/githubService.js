var axios = require('axios');

if (process.env.NODE_ENV === 'development') {
  require('dotenv').config();
}

var githubService = function () {
  var options = {
    headers: {
      'User-Agent': 'wykhuh',
      Authorization: 'token ' + process.env.GITHUB_TOKEN
    }
  };

  function getBio(username) {
    return axios.get('https://api.github.com/users/' + username, options);
  }

  function getRepos(username, currentPage) {
    var page = currentPage || 1;
    return axios.get(
      'https://api.github.com/users/' + username + '/repos?page=' + page, options
    );
  }

  function githubInfo(username, currentPage) {
    return axios.all([getRepos(username, currentPage), getBio(username)])
      .then(function (results) {
        var repos = results[0].data;
        var bio = results[1].data;

        return { repos: repos, bio: bio };
      });
  }

  return {
    getBio: getBio,
    getRepos: getRepos,
    githubInfo: githubInfo
  };
};

module.exports = githubService();

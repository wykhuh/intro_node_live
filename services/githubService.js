var axios = require('axios');
require('dotenv').config();

var githubService = function () {
  var options = {
    headers: {
      'User-Agent': 'wykhuh',
      Authorization: 'token ' + process.env.GITHUB_TOKEN
    }
  };

  function getBio() {
    return axios.get('https://api.github.com/users/wykhuh', options);
  }

  function getRepos() {
    return axios.get('https://api.github.com/users/wykhuh/repos', options);
  }

  function githubInfo() {
    return axios.all([getRepos(), getBio()])
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

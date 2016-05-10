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

  return {
    getBio: getBio,
    getRepos: getRepos
  };
};

module.exports = githubService();

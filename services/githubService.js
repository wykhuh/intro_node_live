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

  function getBio() {
    return axios.get('https://api.github.com/users/wykhuh', options);
  }

  function getRepos(page) {
      //  url: 'https://api.github.com/users/wykhuh/repos?page=

    return axios.get('https://api.github.com/users/wykhuh/repos?page=' + page, options);
  }

  function githubInfo(page) {
    return axios.all([getRepos(page), getBio()])
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

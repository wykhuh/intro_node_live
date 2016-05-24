var fs = require('fs');
var path = require('path');

var projectInfoService = function () {
  function readFile(repoName, callback) {
    var filePath = path.join(__dirname, '../data', repoName + '.html');

    return fs.readFile(filePath, function (error, data) {
      callback(error, data);
    });
  }

  return {
    readFile: readFile
  };
};

module.exports = projectInfoService();

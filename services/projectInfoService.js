var fs = require('fs');
var path = require('path');

var projectInfoService = function () {
  function readFile(repoName, callback) {
    var filePath = path.join(__dirname, '../data', repoName + '.html');

    return fs.readFile(filePath, function (error, data) {
      callback(error, data);
    });
  }

  function fileExists(repoName) {
    var filePath = path.join(__dirname, '../data', repoName + '.html');

    try {
      return fs.statSync(filePath).isFile();
    } catch (err) {
      return false;
    }
  }

  return {
    readFile: readFile,
    fileExists: fileExists
  };
};

module.exports = projectInfoService();

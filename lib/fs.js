var filewalker = require('filewalker');
var fs = require('fs-extra');
var path = require('path');
var q = require('q');

function checkExcludedDir(p, excludes) {
  var bExcluded = false;
  excludes.every(function(exclude) {
    if (p.indexOf(exclude) === 0) {
      bExcluded = true;
      return false;
    } else {
      return true;
    }
  });

  return bExcluded;
}

module.exports.copyContent = function(source, target, excludes) {
  var defer = q.defer();
  var directoriesToCopy = [];
  var filesToCopy = [];
  excludes.push('.git');
  excludes.push('node_modules');
  filewalker(source, {
    recursive: false
  }).on('dir', function(p) {

    if (!checkExcludedDir(p, excludes)) {
      directoriesToCopy.push(p);
    }

  }).on('file', function(p, s) {

    if (!checkExcludedDir(p, excludes)) {
      filesToCopy.push(p);
    }

  }).on('done', function() {

    directoriesToCopy.forEach(function(dirToCopy) {
      fs.copySync(source + '/' + dirToCopy, target + '/' + dirToCopy);
    });

    filesToCopy.forEach(function(fileToCopy) {
      fs.copySync(source + '/' + fileToCopy, target + '/' + fileToCopy);
    });

    defer.resolve();
  }).walk();

  return defer.promise;
};

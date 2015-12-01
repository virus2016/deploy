var q = require('q');
var Guid = require('guid');
var tempDir = require('temp').track();
var git = require('./gitCommands');
var fs = require('./fs');

module.exports = deploy;

function deploy(sourceDir, remote, commitMessage, exclude) {

  var defer = q.defer();
  var currentTempDir = 'c:\\source\\testingdeploy';
  tempDir.mkdir(Guid.raw(), function(err, currentTempDir) {

    var gitRepo;

    git.clone(remote, currentTempDir)

    .then(function(result) {
      gitRepo = result;
      return fs.copyContent(sourceDir, currentTempDir, exclude);
    })

    .then(function(result) {
      return git.addAndCommit(gitRepo, commitMessage);
    })

    .then(function(result) {
      return git.push(gitRepo, 'origin');
    })

    .then(function(result) {
      defer.resolve('Complete');
    })

    .catch(function(err) {
      defer.reject(err);
    });

  });

  return defer.promise;

}

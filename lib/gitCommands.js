var q = require('q');
var git = require('git-exec');

module.exports.clone = function(repoUrl, targetDirectory) {
  var defered = q.defer();

  git.clone(repoUrl, targetDirectory, function(gitRepo) {
    if (gitRepo === null) {
      defered.reject('No repo found');
    } else {
      defered.resolve(gitRepo);
    }
  });

  return defered.promise;
};

module.exports.addAndCommit = function(gitRepo, commitMessage) {
  var defered = q.defer();

  gitRepo.exec('add', ['-A'], function(err, result) {

    if (err) {
      defered.reject(err);
    } else {
      gitRepo.exec('commit', ['-m', '"' + commitMessage + '"'],
        function(err, result) {
          if (err) {
            defered.reject(err);
          } else {
            defered.resolve(result);
          }
        });
    };
  });

  return defered.promise;
};

module.exports.push = function(gitRepo, remote) {
  var defered = q.defer();

  gitRepo.exec('push', [remote], function(err, result) {
    if (err) {
      defered.reject(err);
    } else {
      defered.resolve(result);
    }
  });
  return defered.promise;
};

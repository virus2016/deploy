# deploy2 -- ANYWHERE
### Keeping your deployments in check

Deploy allows to you to clone a Git repo temporary, update and commit files from a source folder then push the changes back up.

#### But why?

Here are the issues:

> When deploying your application to services like Azure or Heroku from a DevOps perspective, it is difficult to keep track of releases.

>When using onsite version control systems like TFS, building node or non .net applications it is near impossible to easily deploy

## Solution
Keep your deployment Git repos (builds) separate from the development repos

#### Right but, just show me the code!

```javascript
var deploy = require('deploy');
var gitUrl = 'https://{username}:{password}@{url}/{path}.git';

deploy('{sourceDir}', gitUrl, '{commitMessage}', [excludefolder, excludefolder])

.then(function(result) {
  console.log(result);
})

.catch(function(err) {
  console.log(err);
});
```

Feel free to contribute


##### TODO

> Add mocha for tests

# Deployment
## Overview
An overview of how deployment should work. Includes continuous integration and stuff

## Current deployment scheme
**Up to date as of 09/03/2019**

As of the above date, app deployment is done through Heroku and goes through the below steps:
```
  git pull request => Travis CI builds the repo => CI runs tests => Coveralls obtains coverage => pull request merged manually => Heroku detects change in master and deploys
```

## CICD deployment
This isn't super efficient though. For starters, having the `heroku-prebuild` script in `package.json` isn't super efficient if we can deploy and run scripts from Travis CI directly.

In addition, as Travis CI lets you do staging, we can build a deployment pipeline where we can run integration tests there to ensure the frontend works with the backend.

Note: for the purposes of this projet, there probably won't be a CICD pipeline, but it is a good thing to think about. Especially for serious projects that are intended to be "sold" or provided for actual consumption.

So the pre-deployment staging pipeline would include end to end tests, might look like so:

```yml
jobs:
  include:
    - stage: "Unit test codebase"
      # ... the rest of the jobs for that stage
    - stage: "Staging for deployment"
      if: branch = master
      env:
        NODE_ENV=staging
      # add Mongo script to add example user
      script: mongo use Todos-local && db.users.add(<add-mock-db-entries-here>)

      # end to end tests
      script: npm run e2e-ts
      script: npm run e2e-tsx
      script: npm run smoke-ts
      script: npm run smoke-tsx
```
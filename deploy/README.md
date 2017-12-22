# deploy

Application is deployed on heroku hostings using codeship


Codeship settings
==================================
We need basic codeship account (without docker!)

We need to perform this as setup commands

```
    npm install
    npm run-script frontend

```

We need to use this as test pipeline:

```
    echo "running lint tools"
    ./node_modules/.bin/gulp test

    echo "testing if redis is in place"
    redis-cli ping
    
    echo "running server-side unit tests"
    npm test

    echo "uploading unit tests code coverage to Codeclimate"
    CODECLIMATE_REPO_TOKEN=b208580aee4ed59ef2d5b8112fbc836edf531dc2cb9569028a83556e7f25e176 ./node_modules/.bin/codeclimate-test-reporter < coverage/lcov.info

```

Than we need to choose heroky as deploy targed.

Than we need to create new applicaion on heroku, and set this environment variables for it
(we assume you have access to https://crm.konnektive.com/admin/users/ for creating api user for it)
on settings page of application.

```

    KONNECTIVE_LOGIN_ID:   flash2dev
    KONNECTIVE_PASSWORD:   ItIsNotAkonnectivePassword
    NPM_CONFIG_LOGLEVEL:   info
    NPM_CONFIG_PRODUCTION: false

```

Than you need to attach heroku redis free tier database to this heroku application.


Than, you need to setup this heroku application as deploy targed of codeship
We need to get heroku api key here https://dashboard.heroku.com/account

Than we need to setup codeship to perform deployes on heroku.
With this settings like this (including heroku api key):

```

Heroku Deployment: flash2dev

    Deployment URL: http://tacticalmastery.com/tacticalsales/robots.txt
    Restore from: NO
    Backup: NO
    Force: YES
    Migrate: NO
    Check url: YES

```

So, as result, on every push to repository codeship CI is performing unit tests.
If this push was to master branch, code is deployed on heroku.



Cloudflare settings with heroku
================================

Probably it can help
https://support.cloudflare.com/hc/en-us/articles/205893698-Configure-Cloudflare-and-Heroku-over-HTTPS
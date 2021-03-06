/* eslint-disable */

'use strict';

require('babel-core/register');
const serverConfig = require('./server-config');

exports.config = {
  framework: 'mocha',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: [
    './test/frontend/index.test.js',
    './test/frontend/footer.test.js',
  ],
  baseUrl: 'http://' + serverConfig.HOST + ':' + serverConfig.PORT,
  mochaOpts: {
    reporter: 'spec',
    timeout: 120000
  },
  capabilities: {
    'browserName': process.env.TEST_BROWSER || 'chrome', //phantomjs, chrome, firefox,

    'phantomjs.binary.path': require('phantomjs-prebuilt').path,
    'phantomjs.ghostdriver.cli.args': ['--loglevel=DEBUG'],

    'chromeOptions': {
      'args': ['show-fps-counter=true']
    },
  }
};

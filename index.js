/* global process */
require('babel-register');
// require('@risingstack/trace');

const winston = require('winston');
const http = require('http');
const os = require('os');
const config = require('./server-config.js');
const app = require('./app.js');
const Sentry = require('winston-sentry');

require('winston-loggly-bulk');
// require('winston-logstash');

winston.cli();
if (config.ENV === 'development') {
  winston.level = 'silly';
} else {
  winston.level = 'verbose';
}

winston.add(Sentry, {
  level: 'warn',
  dsn: config.sentryDSN,
});

winston.add(winston.transports.Loggly, {
  level: 'verbose',
  token: config.loggly.token,
  subdomain: config.loggly.subdomain,
  json: true,
});

// // data is send, but not displayed in ELK stack
// winston.add(winston.transports.Logstash, {
//   port: 28777,
//   node_name: 'thuglogs', // no idea
//   host: '207.154.210.35',
// });
// it was ELK stack logger provided by Wolfman.
// it do not works. I comment it out, because the IP can be occupied by something else
// than Wolfman's machine
// Anatolij


process.title = 'flash2';
process.on('SIGINT', () => {
  process.exit();
});

http
  .createServer(app)
  .listen(config.PORT, config.HOST, (error) => {
    if (error) {
      throw error;
    }
    winston.verbose('HTTP Server Started at %s:%s', config.HOST, config.PORT, {
      buildId: config.buildId,
      type: 'server:start',
      nodejs: process.version,
      arch: process.arch,
      hostname: os.hostname(),
      osType: os.type(),
      osPlatform: os.platform(),
      osRelease: os.release(),
    });
  });

/* eslint-disable no-console */
'use strict';
const config = require('config')

const logger = require('winston');
const app = require('./app');
const port = config.get('server.port');
const server = app.listen(port);

process.on('unhandledRejection', (reason, p) =>
  logger.error('Unhandled Rejection at: Promise ', p, reason)
);

server.on('listening', () =>
  console.log(`Feathers application started on Port ${port}`)
);
/**
 * *Description: Setup Logger
 */
const fs = require('fs');
const { createLogger, format, transports } = require('winston');
const { resolveApp, isFolderAndMkdir } = require('../utils/helper');

const dirLogs = `${resolveApp('')}/logs/`;
isFolderAndMkdir(dirLogs);

const options = {
  file: {
    level: 'info',
    filename: `${resolveApp('')}/logs/app.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

const { combine, timestamp, prettyPrint, label } = format;
const { console, file } = options;
const logger = createLogger({
  format: combine(
    format.splat(),
    timestamp(),
    prettyPrint(),
  ),
  transports: [
    new transports.Console(console),
    new transports.File(file),
    new transports.File({
      ...file,
      level: 'error',
      filename: `${resolveApp('')}/logs/errors.log`,
    }),
  ],
  exitOnError: false,
});
/* eslint no-unused-vars: 0 */
logger.stream = {
  write: (message, encoding) => {
    logger.info(message);
  },
};

module.exports = logger;


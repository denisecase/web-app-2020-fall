/**
 * Custom Winston logger.
 *
 * Allows writing to multiple transports (outputs).
 *
 * Write level `error` and below to `error.log`
 * Write level `info` and below to `combined.log`
 *
 * @link https://github.com/winstonjs/winston
 * @link https://www.npmjs.com/package/winston
 *
 * These default levels are available:
 *   error: 0,
 *   warn: 1,
 *   info: 2,
 *   http: 3,
 *   verbose: 4,
 *   debug: 5,
 *   silly: 6
 *
 * @author Denise Case <dcase@nwmissouri.edu>
 *
 */

const winston = require('winston');

/**
 * A custom Winston logger that can write to
 * files and the console concurrently (and colorfully)
 */
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.simple(),
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.colorize(),
        winston.format.simple(),
      ),
    }),
    new winston.transports.File({
      filename: 'combined.log',
      level: 'info',
    }),
    new winston.transports.File({
      filename: 'errors.log',
      level: 'error',
    }),
  ],
});

module.exports = logger;

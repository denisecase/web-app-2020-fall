#!/usr/bin/env node

/**
 * Start up in different environments
 *
 * - development
 * - test
 * - production
 *
 * Use new ES6 syntax.
 */

// Import dependencies ............................................

const http = require('http');
const dotenv = require('dotenv');
const { Pool } = require('pg');
const LOG = require('../util/logger');
const seeder = require('../util/seeder');
const db = require('../models/index');
const app = require('../app');
const pgconfigs = require('../config/config');

// Helper functions defined first ...................................

/**
 * Normalize a port into a number, string, or false.
 */
const normalizePort = (val) => {
  const port = parseInt(val, 10);
  if (Number.isNaN(port)) {
    // named pipe
    return val;
  }
  if (port >= 0) {
    // port number
    return port;
  }
  return false;
};

/**
 * Confirm connection to the database.
 */
const assertDatabaseConnectionOk = async () => {
  LOG.info('Checking database connection...');
  try {
    await db.authenticate();
    LOG.info('Database connection OK!');
  } catch (err) {
    LOG.info(`Unable to connect to the database: ${err.message}`);
  }
};

/**
 * Load environment variables from .env file,
 *  where API keys and passwords can be configured.
 */
const vars = dotenv.config({ path: '.env' });
if (vars.error) {
  throw vars.error;
}
LOG.info(`Environment variables loaded: ${vars.parsed}`);

/**
 * Get port from environment and store in Express.
 */
const port = normalizePort(process.env.PORT);
app.set('port', port);
LOG.info(`Server Launch at port: ${port}`);

/**
 * Connect to the database.
 */
const dbInit = async () => {
  const isProduction = process.env.NODE_ENV === 'production';
  LOG.info(`Entering dbInit in ${process.env.NODE_ENV} environment.`);

  if (isProduction) {
    const config = pgconfigs[process.env.NODE_ENV];

    // pools will use environment variables
    // for connection information
    const pool = new Pool(config.url, config);
    LOG.info(`Connection pool created (${pool.Number}).`);

    // the pool will emit an error on behalf of any idle clients
    // it contains if a backend error or network partition happens
    pool.on('error', (err) => {
      LOG.error(`Unexpected error on idle client: ${err.message}`);
      process.exit(-1); // exit the app
    });

    // This is an IIFE (Immediately Invoked Function Expression)
    // defined and then immediately called
    // note the parenthesis around the definition followed by () to invoke
    (async () => {
      const client = await pool.connect();
      LOG.info(`Client connection created (${client.Number}).`);
      try {
        const res = await client.query('SELECT NOW() as now');
        await assertDatabaseConnectionOk();
        await seeder(db);
        LOG.info(res.rows[0]);
      } finally {
        // Release client before any error handling,
        // in case error handling itself throws an error.
        client.release();
      }
    })().catch((err) => LOG.error(err.stack));
  } else {
    await assertDatabaseConnectionOk();
    await seeder(db);
  }
};

/**
 * Event listener for HTTP server "error" event.
 *
 * Provide friendly error messages.
 */
const onError = (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;
  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      LOG.info(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      LOG.info(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
};

// Configure & start the server .........................................

/**
 * Create HTTP server
 * Pass in (inject) the Express app
 */
const server = http.createServer(app);

/**
 * Event listener for HTTP server "listening" event.
 *
 * When we start listening:
 *  - initialize the database
 */
const onListening = async () => {
  try {
    await dbInit();
  } catch (err) {
    LOG.error(`ERROR with database:${err.message}`);
  }
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
  LOG.info(`Listening on ${bind}`);
};

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

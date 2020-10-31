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
const { Sequelize } = require('sequelize');
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
 * Test a small query
 */
async function testSmallQuery(client) {
  LOG.info('Before running small query');
  const sql = 'SELECT 1 AS x';
  try {
    const records = await client.query(sql, { raw: true });
    LOG.info(
      `After successfully running small query: ${JSON.stringify(records[0], null, 2)}.`,
    );
  } catch (err) {
    LOG.info(`Error running small query: ${err.message}`);
  }
}

async function main(client) {
  LOG.info('Checking database connection...');
  try {
    await client.authenticate();
    LOG.info('Database connection OK!');
  } catch (err) {
    LOG.info(`Unable to connect to the database: ${err.message}`);
  }
  await testSmallQuery(client);
}

/**
 * Connect to the database.
 */
const dbInit = async () => {
  const isProduction = process.env.NODE_ENV === 'production';
  LOG.info(`Entering dbInit in ${process.env.NODE_ENV} environment.`);

  if (isProduction) {
    const config = pgconfigs[process.env.NODE_ENV];
    const client = new Sequelize(config.url, config);
    main(client);
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

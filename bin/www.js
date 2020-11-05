/**
 * Perform environment and network-related configuration.
 * 
 * Separates aspects that change in different environments, e.g.:
 *
 * - development
 * - test
 * - production
 *
 * 
 * @ link https://github.com/goldbergyoni/nodebestpractices/blob/master/sections/projectstructre/separateexpress.md
 * 
 */

// Import dependencies ............................................

const dotenv = require('dotenv');
const LOG = require('../util/logger');
const app = require('../app');
const server = require('http').createServer(app);

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
 * Event listener for HTTP server "listening" event.
 *
 * When we start listening:
 *  - initialize the database
 */
const onListening = async () => {
  try {
    const db = await require('../models/index')();
    await require('../util/seeder')(db);
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

/**
 * Start up the server, configured for the correct environment, e.g.:
 *
 * - development
 * - test
 * - production
 *
 * @link https://github.com/goldbergyoni/nodebestpractices/
 *        sections/projectstructre/separateexpress.md
 */

// dependencies - main
const http = require('http');
const dotenv = require('dotenv');

// dependencies - local modules
const LOG = require('../util/logger');
const app = require('../app');
const dbContext = require('../models/index');
const seeder = require('../util/seeder');

// create server, injecting the configured app
const server = http.createServer(app);

/**
 * Helper function to normalize a port into a number, string, or false.
 */
const normalizePort = (val) => {
  const port = parseInt(val, 10);
  if (Number.isNaN(port)) {
    // named pipe
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

// Load environment variables from .env file,
// where API keys and passwords can be configured.
const vars = dotenv.config({ path: '.env' });
if (vars.error) {
  throw vars.error;
}
LOG.info(`Environment variables loaded: ${vars.parsed}`);

// Get port from environment and store in Express.
const port = normalizePort(process.env.PORT);
app.set('port', port);
LOG.info(`Server Launch at port: ${port}`);

/**
 * Event listener for HTTP server "error" event.
 * Provides friendly error messages.
 */
const onError = (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;
  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      LOG.error(`${bind} requires elevated privileges`);
      process.errorcode = 1;
      process.exit();
    case 'EADDRINUSE':
      LOG.error(`${bind} is already in use`);
      process.errorcode = 2;
      process.exit();
    default:
      throw error;
  }
};

/**
 * Event listener for HTTP server "listening" event.
 * When we start listening, initialize and seed the database.
 * Extract the seeding functionality as needed.
 */
const onListening = async () => {
  try {
    const db = await dbContext();
    await seeder(db);
  } catch (err) {
    LOG.error(`ERROR with database:${err.message}`);
  }
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
  const env = process.env.NODE_ENV;
  LOG.info(`App listening on ${bind} in ${env} mode`);
  LOG.info('Press CTRL-C to stop\n');
};

// Configure and start the server
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

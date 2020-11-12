/**
 *  Model index.js - adds all model definitions into sequelize
 *
 *
 */

module.exports = async () => {
  const LOG = require('../util/logger');
  LOG.info('Starting models/index.js .......................');

  /**
   * Load environment variables from .env file,
   *  where API keys and passwords can be configured.
   */
  const dotenv = require('dotenv');
  const vars = dotenv.config({ path: '.env' });
  if (vars.error) {
    throw vars.error;
  }
  LOG.info(`Environment variables loaded: ${vars.parsed}`);

  const { Sequelize, DataTypes } = require('sequelize');

  /**
   * Test a small query
   */
  async function testSmallQuery(sequelize) {
    LOG.info('Before running small query');
    const sql = 'SELECT 1 AS x';
    try {
      const records = await sequelize.query(sql, { raw: true });
      LOG.info(
        `After successfully running small query: ${JSON.stringify(
          records[0],
          null,
          2,
        )}.`,
      );
    } catch (err) {
      LOG.info(`Error running small query: ${err.message}`);
    }
  }

  async function main(db) {
    LOG.info('Checking database connection...');

    try {
      await db.authenticate();
      LOG.info('Database connection OK!');
    } catch (err) {
      LOG.info(`Unable to connect to the database: ${err.message}`);
    }

    try {
      await testSmallQuery(db);
    } catch (err) {
      LOG.error(`Error setting app db: ${err.message}`);
    }

    LOG.info('Start reading all model definitions.');

    // Dr. Case - rabbit
    require('./rabbit')(db, DataTypes);

    // Dr. Hoot - tea
    require('./tea')(db, DataTypes);

    // Blake - game
    require('./game')(db, DataTypes);
    // Varsha - animal
    require('./animal')(db, DataTypes);
    // Felipe - ?

    // Jack - chief

    // Sreenidhi - plant
    require('./plant')(db, DataTypes);
    // Sri Vasavi - food
    require('./food')(db, DataTypes);
    // Joseph - software
    require('./software')(db, DataTypes);
    // Stephen - whiskey
    require('./whiskey')(db, DataTypes);
    // Shivani - book

    // Kunal - videoGame
    require('./videogame')(db, DataTypes);
    // Chandler - company
    require('./company')(db, DataTypes);
    // Praneeth - cricket
    require('./cricket')(db, DataTypes);
    // Nithya - series
    require('./series')(db, DataTypes);

    // Zach - fruit
    require('./fruit')(db, DataTypes);

    // Prashansa - dance

    // Sam - ship
    require('./ship')(db, DataTypes);

    // Users
    require('./user')(db, DataTypes);
  }

  /**
   * Connect and initialize the database.
   */
  const dbInit = async () => {
    const isProduction = process.env.NODE_ENV === 'production';
    LOG.info(`Entering dbInit in ${process.env.NODE_ENV} environment.`);
    const pgconfigs = require('../config/config');
    const config = pgconfigs[process.env.NODE_ENV];
    const sequelize = isProduction
      ? new Sequelize(config.url, config)
      : new Sequelize(config);
    await main(sequelize);
    LOG.info('Done connecting and initializing...');
    return sequelize;
  };

  return dbInit();
};

/**
 *  Model index.js - adds all model definitions into sequelize
 *  Updated process all files in the models folder
 *  rather than explicitly calling require for each
 *
 *  @author Denise Case <dcase@nwmissouri.edu>
 *
 */
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const { Sequelize, DataTypes } = require('sequelize');

const envConfigs = require('../config/config');
const LOG = require('../util/logger');

module.exports = async () => {
  LOG.info('Starting models/index.js .......................');

  /**
   * Connect and initialize the database.
   */
  const dbInit = async () => {
    /**
     * Load environment variables from .env file,
     *  where API keys and passwords can be configured.
     */
    const vars = dotenv.config({ path: '.env' });
    if (vars.error) {
      throw vars.error;
    }
    LOG.info(`Environment variables loaded: ${vars.parsed}`);

    const basename = path.basename(__filename);
    const isProduction = process.env.NODE_ENV === 'production';
    LOG.info(`Entering dbInit in ${process.env.NODE_ENV} environment.`);

    const config = envConfigs[process.env.NODE_ENV];

    const sequelize = isProduction
      ? new Sequelize(config.url, config)
      : new Sequelize(config);

    fs.readdirSync(__dirname)
      .filter((file) => {
        return (
          file.indexOf('.') !== 0 &&
          file !== basename &&
          file.slice(-3) === '.js'
        );
      })
      .forEach((file) => {
        require(path.join(__dirname, file))(sequelize, DataTypes);
      });

    LOG.info('Done connecting and initializing...');
    return sequelize;
  };

  return dbInit();
};

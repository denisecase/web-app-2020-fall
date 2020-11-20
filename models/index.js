/**
 *  Model index.js - adds all model definitions into sequelize
 *
 *
 */
const dotenv = require('dotenv');
const { Sequelize, DataTypes } = require('sequelize');
const pgconfigs = require('../config/config');
const LOG = require('../util/logger');
const rabbit = require('./rabbit');
const tea = require('./tea');
const game = require('./game');
const animal = require('./animal');
const country = require('./country');
const chief = require('./chief');
const plant = require('./plant');
const food = require('./food');
const software = require('./software');
const whiskey = require('./whiskey');
const book = require('./book');
const videogame = require('./videogame');
const company = require('./company');
const cricket = require('./cricket');
const series = require('./series');
const fruit = require('./fruit');
const dance = require('./dance');
const ship = require('./ship');
const pokemon = require('./pokemon');
const user = require('./user');
const clue = require('./clue');
const competition = require('./competition');
const location = require('./location');
const quest = require('./quest');
const team = require('./team');

module.exports = async () => {
  LOG.info('Starting models/index.js .......................');

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
          2
        )}.`
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
    rabbit(db, DataTypes);

     // Dr. Hoot - tea
     tea(db, DataTypes);

    // Blake - game
    game(db, DataTypes);

    // Varsha - animal
    animal(db, DataTypes);

    // Felipe - country
    country(db, DataTypes);

    // Jack - chief
    chief(db, DataTypes);

    // Sreenidhi - plant
    plant(db, DataTypes);

    // Sri Vasavi - food
    food(db, DataTypes);

    // Joseph - software
    software(db, DataTypes);

    // Stephen - whiskey
    whiskey(db, DataTypes);

    // Shivani - book
    book(db, DataTypes);

    // Kunal - videoGame
    videogame(db, DataTypes);

    // Chandler - company
    company(db, DataTypes);

    // Praneeth - cricket
    cricket(db, DataTypes);

    // Nithya - series
    series(db, DataTypes);

    // Zach - fruit
    fruit(db, DataTypes);

    // Prashansa - dance
    dance(db, DataTypes);

    // Sam - ship
    ship(db, DataTypes);

    // Lindsey - pokemon
    pokemon(db, DataTypes);

    // Users
    user(db, DataTypes);

    // Hunt
    clue(db, DataTypes);
    competition(db, DataTypes);
    quest(db, DataTypes);
    location(db, DataTypes);
    team(db, DataTypes);
  }

  /**
   * Connect and initialize the database.
   */
  const dbInit = async () => {
    const isProduction = process.env.NODE_ENV === 'production';
    LOG.info(`Entering dbInit in ${process.env.NODE_ENV} environment.`);
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

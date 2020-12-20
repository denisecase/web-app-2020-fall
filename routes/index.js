/**
 * @index.js - manages all routing
 *
 * router.get when assigning to a single request
 * router.use when deferring to a controller
 *
 * @author Denise Case <dcase@nwmissouri.edu>
 * @requires express
 */

const express = require('express');
const LOG = require('../util/logger');
const userRouter = require('./users');
const rabbitRoutes = require('./rabbit.routes');
const teaRoutes = require('./tea.routes');
const animalRoutes = require('./animal.routes');
const gameRoutes = require('./game.routes');
const countryRoutes = require('./country.routes');
const chiefRoutes = require('./chief.routes');
const plantRoutes = require('./plant.routes');
const foodRoutes = require('./food.routes');
const softwareRoutes = require('./software.routes');
const whiskeyRoutes = require('./whiskey.routes');
const bookRoutes = require('./book.routes');
const videogameRoutes = require('./videogame.routes');
const companyRoutes = require('./company.routes');
const cricketRoutes = require('./cricket.routes');
const seriesRoutes = require('./series.routes');
const fruitRoutes = require('./fruit.routes');
const shipRoutes = require('./ship.routes');
const danceRoutes = require('./dance.routes');
const pokemanRoutes = require('./pokemon.routes');
const clueRoutes = require('./clue.routes');
const competitionRoutes = require('./competition.routes');
const locationRoutes = require('./location.routes');
const questRoutes = require('./quest.routes');
const teamRoutes = require('./team.routes');
const playerRoutes = require('./player.routes');

LOG.info('routes/index.js: STARTING custom routes......');

const router = express.Router();

// Manage top-level request first

const appTitle = 'MVC Web App - Fall 2020';
const appSubTitle = 'our collaborative web app';

/* GET home page. */
router.get('/', (req, res) => {
  return res.render('index.ejs', {
    title: appTitle,
    subTitle: appSubTitle,
  });
});

router.get('/index', (req, res) => {
  return res.redirect('/');
});

router.use('/user', userRouter);

// better route to t-e-a-m before we route to t-e-a
// team routing moved before tea routing
try {
  router.use('/team', teamRoutes);
} catch (err) {
  LOG.error(`ERROR: ${err.message}`);
}

// Dr. Case - rabbit
try {
  router.use('/rabbit', rabbitRoutes);
} catch (err) {
  LOG.error(`ERROR: ${err.message}`);
}

// Dr. Hoot - tea
try {
  router.use('/tea', teaRoutes);
} catch (err) {
  LOG.error(`ERROR: ${err.message}`);
}

// Blake - game
try {
  router.use('/game', gameRoutes);
} catch (err) {
  LOG.error(`ERROR: ${err.message}`);
}

// Varsha - animal
try {
  router.use('/animal', animalRoutes);
} catch (err) {
  LOG.error(`ERROR: ${err.message}`);
}

// Felipe - country
try {
  router.use('/country', countryRoutes);
} catch (err) {
  LOG.error(`ERROR: ${err.message}`);
}

// Jack - chief
try {
  router.use('/chief', chiefRoutes);
} catch (err) {
  LOG.error(`ERROR: ${err.message}`);
}

// Sreenidhi - plant
try {
  router.use('/plant', plantRoutes);
} catch (err) {
  LOG.error(`ERROR: ${err.message}`);
}

// Sri Vasavi - food
try {
  router.use('/food', foodRoutes);
} catch (err) {
  LOG.error(`ERROR: ${err.message}`);
}

// Joseph - software
router.use('/software', softwareRoutes);

// Stephen - whiskey
try {
  router.use('/whiskey', whiskeyRoutes);
} catch (err) {
  LOG.error(`ERROR: ${err.message}`);
}

// Shivani - book
router.use('/book', bookRoutes);

// Kunal - videoGame
try {
  router.use('/videogame', videogameRoutes);
} catch (err) {
  LOG.error(`ERROR: ${err.message}`);
}
// Chandler - company
try {
  router.use('/company', companyRoutes);
} catch (err) {
  LOG.error(`ERROR: ${err.message}`);
}

// Praneeth - cricket
router.use('/cricket', cricketRoutes);

// Nithya - series
router.use('/series', seriesRoutes);

// Zach - fruit
try {
  router.use('/fruit', fruitRoutes);
} catch (err) {
  LOG.error(`ERROR: ${err.message}`);
}

// Sam - ship
try {
  router.use('/ship', shipRoutes);
} catch (err) {
  LOG.error(`ERROR: ${err.message}`);
}

// Prashansa - dance
try {
  router.use('/dance', danceRoutes);
} catch (err) {
  LOG.error(`ERROR: ${err.message}`);
}

// Lindsey - Pokemon
try {
  router.use('/pokemon', pokemanRoutes);
} catch (err) {
  LOG.error(`ERROR: ${err.message}`);
}

// Dr. Case - hunt
try {
  router.use('/clue', clueRoutes);
} catch (err) {
  LOG.error(`ERROR: ${err.message}`);
}
try {
  router.use('/competition', competitionRoutes);
} catch (err) {
  LOG.error(`ERROR: ${err.message}`);
}

try {
  router.use('/location', locationRoutes);
} catch (err) {
  LOG.error(`ERROR: ${err.message}`);
}

try {
  router.use('/quest', questRoutes);
} catch (err) {
  LOG.error(`ERROR: ${err.message}`);
}

try {
  router.use('/player', playerRoutes);
} catch (err) {
  LOG.error(`ERROR: ${err.message}`);
}

// better route to t-e-a-m before we route to t-e-a
// team routing moved before tea routing
// try {
//   router.use('/team', teamRoutes);
// } catch (err) {
//   LOG.error(`ERROR: ${err.message}`);
// }

LOG.info('routes/index.js: ENDING custom routes......');

module.exports = router;

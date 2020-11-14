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

LOG.info('routes/index.js: STARTING custom routes......');

const router = express.Router();

// Manage top-level request first

const appTitle = 'MVC Web App - Fall 2020';
const appSubTitle = 'our collaborative web app';

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index.ejs', { title: appTitle, subTitle: appSubTitle });
});

router.get('/index', (req, res) => {
  res.render('index.ejs', { title: appTitle, subTitle: appSubTitle });
});

router.use('/user', userRouter);

// Dr. Case - rabbit
try {
  router.use('/rabbit', rabbitRoutes);
} catch (err) {
  LOG.error(`ERROR: ${err.message}`);
}

// Dr. Hoot - tea
router.use('/tea', require('./tea.routes'));

// Blake - game
try {
  router.use('/game', require('./game.routes'));
} catch (err) {
  LOG.error(`ERROR: ${err.message}`);
}

// Varsha - animal
try {
  router.use('/animal', require('./animal.routes'));
} catch (err) {
  LOG.error(`ERROR: ${err.message}`);
}

// Felipe - country
try {
  router.use('/country', require('./country.routes'));
} catch (err) {
  LOG.error(`ERROR: ${err.message}`);
}

// Jack - chief
try {
  router.use('/chief', require('./chief.routes'));
} catch (err) {
  LOG.error(`ERROR: ${err.message}`);
}

// Sreenidhi - plant
try {
  router.use('/plant', require('./plant.routes'));
} catch (err) {
  LOG.error(`ERROR: ${err.message}`);
}

// Sri Vasavi - food
router.use('/food', require('./food.routes'));

// Joseph - software
router.use('/software', require('./software.routes'));

// Stephen - whiskey
try {
  router.use('/whiskey', require('./whiskey.routes'));
} catch (err) {
  LOG.error(`ERROR: ${err.message}`);
}

// Shivani - book
router.use('/book', require('./book.routes'));

// Kunal - videoGame
try {
  router.use('/videogame', require('./videogame.routes'));
} catch (err) {
  LOG.error(`ERROR: ${err.message}`);
}
// Chandler - company
try {
  router.use('/company', require('./company.routes'));
} catch (err) {
  LOG.error(`ERROR: ${err.message}`);
}

// Praneeth - cricket
router.use('/cricket', require('./cricket.routes'));

// Nithya - series
router.use('/series', require('./series.routes'));

// Zach - fruit
try {
  router.use('/fruit', require('./fruit.routes'));
} catch (err) {
  LOG.error(`ERROR: ${err.message}`);
}

// Sam - ship
try {
  router.use('/ship', require('./ship.routes'));
} catch (err) {
  LOG.error(`ERROR: ${err.message}`);
}

// Prashansa - dance
try {
  router.use('/dance', require('./dance.routes'));
} catch (err) {
  LOG.error(`ERROR: ${err.message}`);
}

// Lindsey - Pokemon
try {
  router.use('/pokemon', require('./pokemon.routes'));
} catch (err) {
  LOG.error(`ERROR: ${err.message}`);
}

LOG.info('routes/index.js: ENDING custom routes......');

module.exports = router;

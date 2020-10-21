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

// Route requests that start with an expression to a controller
router.use('/rabbit', require('../controllers/rabbitController.js'));
router.use('/animal', require('../controllers/animalController.js'));
router.use('/game', require('../controllers/gameController.js'));

module.exports = router;

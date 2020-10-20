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

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'MVC' });
});

router.get('/index', (req, res, next) => {
  res.render('index', { title: 'MVC' })
})

// Route requests that start with an expression to a controller
router.use('/rabbit', require('../controllers/rabbitController.js'))

module.exports = router;

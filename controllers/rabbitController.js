/** 
*  Rabbit controller
*  Handles requests related to rabbits (see routes)
*
* @author Denise Case <dcase@nwmissouri.edu>
*/

// import dependencies
const express = require('express');

// import local code files
const Model = require('../models/rabbit.js');

// create a router
const router = express.Router();

module.exports = router;
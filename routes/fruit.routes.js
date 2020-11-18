/**
 * Route fruit requests to the correct controller function.
 *
 * A request includes:
 *  an HTTP verb (e.g., get or post) AND
 *  a URL endpoint (e.g., /create)
 *
 * Match each expeced verb + URL request
 * with a custom function to handle it
 *
 * @author Zach Watson <s531994@nwmissouri.edu>
 */

const router = require('express').Router();
const controller = require('../controllers/fruitController.js');
const LOG = require('../util/logger');

LOG.info('Starting fruit routing.');

// -----------------------------------------------------------------------------
// match each expeced verb + URL request
// with a custom function to handle it
// -----------------------------------------------------------------------------

// handle two requests for JSON (HTTP GET)

router.get('/findall', controller.findAll);
router.get('/findone/:id', controller.findOne);

// handle three requests to perform database actions (HTTP POST)

router.post('/save', controller.saveNew);
router.post('/save/:id', controller.saveEdit);
router.post('/delete/:id', controller.deleteItem);

// handle five requests for webpages (HTTP GET)

router.get('/', controller.showIndex);
router.get('/create', controller.showCreate);
router.get('/details/:id', controller.showDetails);
router.get('/edit/:id', controller.showEdit);
router.get('/delete/:id', controller.showDelete);

LOG.info('Loaded fruit routes.');

module.exports = router;

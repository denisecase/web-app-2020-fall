/**
 * Route user requests to the correct controller function.
 *
 * A request includes:
 *  an HTTP verb (e.g., get or post) AND
 *  a URL endpoint (e.g., /create)
 *
 * Match each expeced verb + URL request
 * with a custom function to handle it
 *
 * @author Denise Case <dcase@nwmissouri.edu>
 */

const router = require('express').Router();
const controller = require('../controllers/userController.js');

console.info('Starting user routing.');

// -----------------------------------------------------------------------------
// match each expeced verb + URL request
// with a custom function to handle it
// -----------------------------------------------------------------------------

// handle requests for JSON (HTTP GET) - temporary

router.get('/', controller.findAll);
router.get('/findall', controller.findAll);

// handle requests to perform update actions (HTTP POST)

router.post('/login', controller.postLogin);
router.post('/register', controller.postRegister);
router.post('/forgot-password', controller.postForgotPassword);

// handle requests for webpages (HTTP GET)

router.get('/login', controller.showLogin);
router.get('/register', controller.showRegister);
router.get('/forgot-password', controller.showForgotPassword);

console.info('Loaded user routes.');

module.exports = router;

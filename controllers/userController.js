/**
 *  User controller
 *  Handles requests related to users (see routes)
 *
 * @author Denise Case <dcase@nwmissouri.edu>
 */

// OPTIONAL: If using Sequelize validation features
const { ValidationError } = require('sequelize');

const LOG = require('../util/logger');

const db = require('../models/index')();

// FUNCTIONS TO RESPOND WITH JSON DATA  ----------------------------------------

// GET all JSON
exports.findAll = async (req, res) => {
  (await db).models.User.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Error retrieving all.',
      });
    });
};

// HANDLE EXECUTE DATA MODIFICATION REQUESTS -----------------------------------

// POST /login
exports.postLogin = async (req, res) => {
  LOG.info('Called login');
  return res.redirect('/');
};

// POST /register
exports.postRegister = async (req, res) => {
  LOG.info('Called register');
  return res.redirect('/');
};

// POST /forgot-password
exports.postForgotPassword = async (req, res) => {
  LOG.info('Called forgot password');
  return res.redirect('/');
};

// RESPOND WITH VIEWS  --------------------------------------------

// GET /login
exports.showLogin = async (req, res) => {
  return res.render('user/login.ejs', { title: 'Users', res });
};

// GET /register
exports.showRegister = async (req, res) => {
  return res.render('user/register.ejs', { title: 'Users', res });
};

// GET /forgot-password
exports.showForgotPassword = async (req, res) => {
  return res.render('user/forgotPassword.ejs', { title: 'Users', res });
};

/**
 *  User controller
 *  Handles requests related to users (see routes)
 *
 * @author Denise Case <dcase@nwmissouri.edu>
 */

// OPTIONAL: If using Sequelize validation features
// const { ValidationError } = require('sequelize');

const LOG = require('../util/logger');

const db = require('../models/index')();

// FUNCTIONS TO RESPOND WITH JSON DATA  ----------------------------------------

// GET all JSON
module.exports.findAll = async (req, res) => {
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

// GET one JSON by ID
module.exports.findOne = async (req, res) => {
  const { id } = req.params;
  (await db).models.User.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error retrieving item with id=${id}: ${err.message}`,
      });
    });
};

// HANDLE EXECUTE DATA MODIFICATION REQUESTS -----------------------------------

// POST /login
module.exports.postLogin = async (req, res) => {
  LOG.info('Called login');
  return res.redirect('/');
};

// POST /register
module.exports.postRegister = async (req, res) => {
  LOG.info('Called register');
  return res.redirect('/');
};

// POST /forgot-password
module.exports.postForgotPassword = async (req, res) => {
  LOG.info('Called forgot password');
  return res.redirect('/');
};

// RESPOND WITH VIEWS  --------------------------------------------

// GET /login
module.exports.showLogin = async (req, res) => {
  return res.render('user/login.ejs', { title: 'Users', res });
};

// GET /logout
module.exports.showLogout = async (req, res) => {
  //req.logout();
  res.redirect('/');
};

// GET /register
module.exports.showRegister = async (req, res) => {
  return res.render('user/register.ejs', { title: 'Users', res });
};

// GET /forgot-password
module.exports.showForgotPassword = async (req, res) => {
  return res.render('user/forgotPassword.ejs', { title: 'Users', res });
};

// RESPOND WITH READ-ONLY TABLE (During development) ------------------------

// GET to this controller base URI (the default)
module.exports.showIndex = async (req, res) => {
  (await db).models.User.findAll()
    .then((data) => {
      res.locals.users = data;
      res.render('user/index.ejs', { title: 'Users', res });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Error retrieving all.',
      });
    });
};

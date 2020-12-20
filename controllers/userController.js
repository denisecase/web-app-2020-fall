/**
 *  User controller
 *  Handles requests related to users (see routes)
 *
 * @author Denise Case <dcase@nwmissouri.edu>
 */

const passport = require('passport');
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
module.exports.postLogin = (req, res, next) => {
  LOG.info('userController: request to POST /user/login');
  passport.authenticate('local', {
    successRedirect: process.env.BASE_URL,
    failureRedirect: '/user/login',
    failureFlash: true,
    successFlash: 'Welcome - logged in!',
  })(req, res, next);
};

// GET /logout
module.exports.logout = (req, res) => {
  LOG.info('userController: request to GET /user/logout');
  req.logout();
  LOG.info('userController: logged out (req.user removed)');
  req.flash('success_msg', 'You are logged out');
  res.redirect(process.env.BASE_URL);
};

// POST /register
module.exports.postRegister = async (req, res) => {
  LOG.info('userController: request to POST /user/register');
  let errors = [];
  const { email, password, password2 } = req.body;
  if (!email || !password || !password2) {
    errors.push({ msg: 'Please enter all fields' });
  }
  if (password !== password2) {
    errors.push({ msg: 'Passwords do not match' });
  }
  if (password.length < 8) {
    errors.push({ msg: 'Password must be 8 or more characters' });
  }
  if (password.length > 20) {
    errors.push({ msg: 'Password must be 20 or less characters' });
  }
  if (errors.length > 0) {
    return res.render('user/register', {
      errors,
      email,
      password,
      password2,
    });
  }
  // no validation errors... continue....
  errors = [];
  LOG.info('userController: no registration validation errors');
  LOG.info('userController: checking if user exists');
  try {
    const user = await (await db).models.User.findOne({ where: { email } });
    LOG.info(`userController: found user=${JSON.stringify(user)}`);
    if (user) {
      errors.push({ msg: `${email} is already registered. Please login` });
      return res.render('user/login', {
        errors,
        email,
      });
    }
  } catch (err) {
    errors.push({ msg: `Error registering: ${err.message}` });
    return res.render('user/register', {
      errors,
      email,
      password,
      password2,
    });
  }

  LOG.info('userController: creating new user');
  const newUser = (await db).models.User.create({
    email: req.body.email,
    password: req.body.password,
  });
  LOG.info(`userController: new user=${newUser}`);

  errors = [];
  if (newUser) {
    errors.push({ msg: 'You are registered and can now log in' });
    return res.render('user/login', {
      errors,
      email,
    });
  }

  errors.push({ msg: 'Error registering; please try again' });
  return res.render('user/register', {
    errors,
    email,
    password,
    password2,
  });
};

// POST /forgot-password
module.exports.postForgotPassword = async (req, res) => {
  LOG.info('Called forgot password');
  return res.redirect('/');
};

// RESPOND WITH VIEWS  --------------------------------------------

// GET /login
module.exports.showLogin = async (req, res) => {
  return res.render('user/login.ejs', {
    title: 'Login',
    res,
  });
};

// GET /register
module.exports.showRegister = async (req, res) => {
  return res.render('user/register.ejs', {
    title: 'Register',
    res,
  });
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

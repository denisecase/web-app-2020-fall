/**
 *  Pokemon controller
 *  Handles requests related to pokemon (see routes)
 *
 * @author Lindsey Fares <s524219@nwmissouri.edu>
 */

// OPTIONAL: If using Sequelize validation features
const { ValidationError } = require('sequelize');

const LOG = require('../util/logger');

const db = require('../models/index')();

// OPTIONAL: VALIDATION Helper function ----------------------

/**
 * Prepare an item from the request information and add
 * an 'error' attribute to share with the view.
 *
 * @param {*} err - the error
 * @param {*} req - the request
 * @returns - the item to attach to response.locals
 */
async function prepareInvalidItem(err, req) {
  LOG.error('ERROR SAVING ITEM');
  LOG.error('Captured validation error: ', err.errors[0].message);
  const item = {};
  if (req.body.id) {
    item.id = req.body.id;
  }
  item.name = req.body.name;
  item.generation = req.body.generation;
  item.isStarter = req.body.isStarter;
  item.error = err.errors[0].message;
  LOG.info(`ERROR SAVING ITEM: ${JSON.stringify(item)}`);
  return item;
}

// FUNCTIONS TO RESPOND WITH JSON DATA  ----------------------------------------

// GET all JSON
exports.findAll = async (req, res) => {
  (await db).models.Pokemon.findAll()
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
exports.findOne = async (req, res) => {
  const { id } = req.params;
  (await db).models.Pokemon.findByPk(id)
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

// POST /save
exports.saveNew = async (req, res) => {
  try {
    const context = await db;
    await context.models.Pokemon.create(req.body);
    return res.redirect('/pokemon');
  } catch (err) {
    if (err instanceof ValidationError) {
      const item = await prepareInvalidItem(err, req);
      res.locals.pokemon = item;
      return res.render('pokemon/create.ejs', { title: 'Pokemon', res });
    }
    return res.redirect('/pokemon');
  }
};

// POST /save/:id
exports.saveEdit = async (req, res) => {
  try {
    const reqId = parseInt(req.params.id, 10);
    const context = await db;
    const updated = await context.models.Pokemon.update(req.body, {
      where: { id: reqId },
    });
    LOG.info(`Updated: ${JSON.stringify(updated)}`);
    return res.redirect('/pokemon');
  } catch (err) {
    if (err instanceof ValidationError) {
      const item = await prepareInvalidItem(err, req);
      res.locals.rabbit = item;
      return res.render('pokemon/edit.ejs', { title: 'Pokemon', res });
    }
    return res.redirect('/pokemon');
  }
};

// POST /delete/:id
exports.deleteItem = async (req, res) => {
  try {
    const reqId = parseInt(req.params.id, 10);
    const deleted = (await db).models.Pokemon.destroy({
      where: { id: reqId },
    });
    if (deleted) {
      return res.redirect('/pokemon');
    }
    throw new Error(`${reqId} not found`);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

// RESPOND WITH VIEWS  --------------------------------------------

// GET to this controller base URI (the default)
exports.showIndex = async (req, res) => {
  (await db).models.Pokemon.findAll()
    .then((data) => {
      res.locals.pokemon = data;
      res.render('pokemon/index.ejs', { title: 'Pokemon', res });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Error retrieving all.',
      });
    });
};

// GET /create
exports.showCreate = async (req, res) => {
  // create a temp pokemon and add it to the response.locals object
  // this will provide a pokemon object to put any validation errors
  const tempItem = {
    name: 'PokemonName',
    generation: 1,
    isStarter: true,
  };
  res.locals.pokemon = tempItem;
  res.render('pokemon/create.ejs', { title: 'Pokemon', res });
};

// GET /delete/:id
exports.showDelete = async (req, res) => {
  const { id } = req.params;
  (await db).models.Pokemon.findByPk(id)
    .then((data) => {
      res.locals.pokemon = data;
      if (data) {
        res.render('pokemon/delete.ejs', { title: 'Pokemon', res });
      } else {
        res.redirect('pokemon/');
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error retrieving item with id=${id}: ${err.message}`,
      });
    });
};

// GET /details/:id
exports.showDetails = async (req, res) => {
  const { id } = req.params;
  (await db).models.Pokemon.findByPk(id)
    .then((data) => {
      res.locals.pokemon = data;
      res.render('pokemon/details.ejs', { title: 'Pokemon', res });
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error retrieving item with id=${id}: ${err.message}`,
      });
    });
};

// GET /edit/:id
exports.showEdit = async (req, res) => {
  const { id } = req.params;
  (await db).models.Pokemon.findByPk(id)
    .then((data) => {
      res.locals.pokemon = data;
      res.render('pokemon/edit.ejs', { title: 'Pokemon', res });
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error retrieving item with id=${id}: ${err.message}`,
      });
    });
};

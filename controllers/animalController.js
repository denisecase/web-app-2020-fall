/**
 *  animal controller
 *  Handles requests related to animal (see routes)
 *
 * @author Varsha Vellalnki <s540114@nwmissouri.edu>
 */

/// OPTIONAL: If using Sequelize validation features
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
  item.lifeSpan = req.body.lifeSpan;
  item.isPet = req.body.isPet;
  item.error = err.errors[0].message;
  LOG.info(`ERROR SAVING ITEM: ${JSON.stringify(item)}`);
  return item;
}

// FUNCTIONS TO RESPOND WITH JSON DATA  ----------------------------------------

// GET all JSON
module.exports.findAll = async (req, res) => {
  (await db).models.Animal.findAll()
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
  (await db).models.Animal.findByPk(id)
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
module.exports.saveNew = async (req, res) => {
  try {
    const context = await db;
    await context.models.Animal.create(req.body);
    return res.redirect('/animal');
  } catch (error) {
    if (error instanceof ValidationError) {
      const item = await prepareInvalidItem(error, req);
      res.locals.animal = item;
      return res.render('animal/create.ejs', { title: 'Animals', res });
    }
    return res.redirect('/animal');
  }
};

// POST /save/:id
module.exports.saveEdit = async (req, res) => {
  try {
    const reqId = parseInt(req.params.id, 10);
    const context = await db;
    const updated = await context.models.Animal.update(req.body, {
      where: { id: reqId },
    });
    LOG.info(`Updated: ${JSON.stringify(updated)}`);
    return res.redirect('/animal');
  } catch (err) {
    if (err instanceof ValidationError) {
      const item = await prepareInvalidItem(err, req);
      res.locals.animal = item;
      return res.render('animal/edit.ejs', { title: 'Animals', res });
    }
    return res.redirect('/animal');
  }
};

// POST /delete/:id
module.exports.deleteItem = async (req, res) => {
  try {
    const reqId = parseInt(req.params.id, 10);
    const deleted = (await db).models.Animal.destroy({
      where: { id: reqId },
    });
    if (deleted) {
      return res.redirect('/animal');
    }
    throw new Error(`${reqId} not found`);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

// RESPOND WITH VIEWS  --------------------------------------------

// GET to this controller base URI (the default)
module.exports.showIndex = async (req, res) => {
  (await db).models.Animal.findAll()
    .then((data) => {
      res.locals.animals = data;
      res.render('animal/index.ejs', { title: 'Animals', res });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Error retrieving all.',
      });
    });
};

// GET /create
module.exports.showCreate = async (req, res) => {
  // create a temp animal and add it to the response.locals object
  // this will provide a animal object to put any validation errors
  const tempItem = {
    name: 'AnimalName',
    lifeSpan: 1,
    isPet: true,
  };
  res.locals.animal = tempItem;
  res.render('animal/create.ejs', { title: 'Animals', res });
};

// GET /delete/:id
module.exports.showDelete = async (req, res) => {
  const { id } = req.params;
  (await db).models.Animal.findByPk(id)
    .then((data) => {
      res.locals.animal = data;
      if (data) {
        res.render('animal/delete.ejs', { title: 'Animals', res });
      } else {
        res.redirect('animal/');
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error retrieving item with id=${id}: ${err.message}`,
      });
    });
};

// GET /details/:id
module.exports.showDetails = async (req, res) => {
  const { id } = req.params;
  (await db).models.Animal.findByPk(id)
    .then((data) => {
      res.locals.animal = data;
      res.render('animal/details.ejs', { title: 'Animals', res });
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error retrieving item with id=${id}: ${err.message}`,
      });
    });
};

// GET /edit/:id
module.exports.showEdit = async (req, res) => {
  const { id } = req.params;
  (await db).models.Animal.findByPk(id)
    .then((data) => {
      res.locals.animal = data;
      res.render('animal/edit.ejs', { title: 'Animals', res });
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error retrieving item with id=${id}: ${err.message}`,
      });
    });
};

/**
 *  cricket controller
 *  Handles requests related to crickets (see routes)
 *
 * @author Praneeth Vallabhaneni <S541312@nwmissouri.edu>
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
  item.age = req.body.age;
  item.isCartoon = req.body.isCartoon;
  item.error = err.errors[0].message;
  LOG.info(`ERROR SAVING ITEM: ${JSON.stringify(item)}`);
  return item;
}

// FUNCTIONS TO RESPOND WITH JSON DATA  ----------------------------------------

// GET all JSON
module.exports.findAll = async (req, res) => {
  (await db).models.Cricket.findAll()
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
  (await db).models.Cricket.findByPk(id)
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
    await context.models.Cricket.create(req.body);
    return res.redirect('/cricket');
  } catch (err) {
    if (err instanceof ValidationError) {
      const item = await prepareInvalidItem(err, req);
      res.locals.cricket = item;
      return res.render('cricket/create.ejs', { title: 'crickets', res });
    }
    return res.redirect('/cricket');
  }
};

// POST /save/:id
module.exports.saveEdit = async (req, res) => {
  try {
    const reqId = parseInt(req.params.id, 10);
    const context = await db;
    const updated = await context.models.Cricket.update(req.body, {
      where: { id: reqId },
    });
    LOG.info(`Updated: ${JSON.stringify(updated)}`);
    return res.redirect('/cricket');
  } catch (err) {
    if (err instanceof ValidationError) {
      const item = await prepareInvalidItem(err, req);
      res.locals.cricket = item;
      return res.render('cricket/edit.ejs', { title: 'crickets', res });
    }
    return res.redirect('/cricket');
  }
};

// POST /delete/:id
module.exports.deleteItem = async (req, res) => {
  try {
    const reqId = parseInt(req.params.id, 10);
    const deleted = (await db).models.Cricket.destroy({
      where: { id: reqId },
    });
    if (deleted) {
      return res.redirect('/cricket');
    }
    throw new Error(`${reqId} not found`);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

// RESPOND WITH VIEWS  --------------------------------------------

// GET to this controller base URI (the default)
module.exports.showIndex = async (req, res) => {
  (await db).models.Cricket.findAll()
    .then((data) => {
      res.locals.crickets = data;
      res.render('cricket/index.ejs', { title: 'crickets', res });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Error retrieving all.',
      });
    });
};

// GET /create
module.exports.showCreate = async (req, res) => {
  // create a temp cricket and add it to the response.locals object
  // this will provide a cricket object to put any validation errors
  const tempItem = {
    name: 'cricketName',
    age: 1,
    isCartoon: true,
  };
  res.locals.cricket = tempItem;
  res.render('cricket/create.ejs', { title: 'crickets', res });
};

// GET /delete/:id
module.exports.showDelete = async (req, res) => {
  const { id } = req.params;
  (await db).models.Cricket.findByPk(id)
    .then((data) => {
      res.locals.cricket = data;
      if (data) {
        res.render('cricket/delete.ejs', { title: 'crickets', res });
      } else {
        res.redirect('cricket/');
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
  (await db).models.Cricket.findByPk(id)
    .then((data) => {
      res.locals.cricket = data;
      res.render('cricket/details.ejs', { title: 'crickets', res });
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
  (await db).models.Cricket.findByPk(id)
    .then((data) => {
      res.locals.cricket = data;
      res.render('cricket/edit.ejs', { title: 'crickets', res });
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error retrieving item with id=${id}: ${err.message}`,
      });
    });
};

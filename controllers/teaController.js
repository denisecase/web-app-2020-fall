/**
 *  Tea controller
 *  Handles requests related to tea (see routes)
 *
 * @author Charles Hoot <hoot@nwmissouri.edu>
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
  item.pricePerGram = req.body.pricePerGram;
  item.isPuer = req.body.isPuer;
  item.error = err.errors[0].message;
  LOG.info(`ERROR SAVING ITEM: ${JSON.stringify(item)}`);
  return item;
}



// FUNCTIONS TO RESPOND WITH JSON DATA  ----------------------------------------

// GET all JSON
module.exports.findAll = async (req, res) => {
  (await db).models.Tea.findAll()
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
  (await db).models.Tea.findByPk(id)
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

module.exports.saveNew = async (req, res) => {
  try {
    const context = await db;
    await context.models.Tea.create(req.body);
    return res.redirect('/tea');
  } catch (err) {
    if (err instanceof ValidationError) {
      const item = await prepareInvalidItem(err, req);
      res.locals.tea = item;
      return res.render('tea/create.ejs', { title: 'Teas', res });
    }
    return res.redirect('/tea');
  }
};

/// POST /save/:id
module.exports.saveEdit = async (req, res) => {
  try {
    const reqId = parseInt(req.params.id, 10);
    const context = await db;
    const updated = await context.models.Tea.update(req.body, {
      where: { id: reqId },
    });
    LOG.info(`Updated: ${JSON.stringify(updated)}`);
    return res.redirect('/tea');
  } catch (err) {
    if (err instanceof ValidationError) {
      const item = await prepareInvalidItem(err, req);
      res.locals.tea = item;
      return res.render('tea/edit.ejs', { title: 'Teas', res });
    }
    return res.redirect('/tea');
  }
};

// POST /delete/:id
module.exports.deleteItem = async (req, res) => {
  try {
    const reqId = parseInt(req.params.id, 10);
    const deleted = (await db).models.Tea.destroy({
      where: { id: reqId },
    });
    if (deleted) {
      return res.redirect('/tea');
    }
    throw new Error(`${reqId} not found`);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

// RESPOND WITH VIEWS  --------------------------------------------

// GET to this controller base URI (the default)
module.exports.showIndex = async (req, res) => {
  (await db).models.Tea.findAll()
    .then((data) => {
      res.locals.teas = data;
      res.render('tea/index.ejs', { title: 'Teas', res });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Error retrieving all.',
      });
    });
};

// GET /create
module.exports.showCreate = async (req, res) => {
  // create a temp tea and add it to the response.locals object
  // this will provide a tea object to put any validation errors
  const tempItem = {
    name: 'TeatName',
    pricePerGram: 2.3,
    isPuer: true,
  };
  res.locals.tea = tempItem;
  res.render('tea/create.ejs', { title: 'Teas', res });
};

// GET /delete/:id
module.exports.showDelete = async (req, res) => {
  const { id } = req.params;
  (await db).models.Tea.findByPk(id)
    .then((data) => {
      res.locals.tea = data;
      if (data) {
        res.render('tea/delete.ejs', { title: 'Teas', res });
      } else {
        res.redirect('tea/');
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
  (await db).models.Tea.findByPk(id)
    .then((data) => {
      res.locals.tea = data;
      res.render('tea/details.ejs', { title: 'Teas', res });
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
  (await db).models.Tea.findByPk(id)
    .then((data) => {
      res.locals.tea = data;
      res.render('tea/edit.ejs', { title: 'Teas', res });
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error retrieving item with id=${id}: ${err.message}`,
      });
    });
};

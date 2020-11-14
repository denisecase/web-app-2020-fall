/**
 *  Whiskey controller
 *  Handles requests related to whiskeys (see routes)
 *
 * @author Stephen Burke <Burke.stephenpaul@gmail.com>
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
  item.isScotch = req.body.isScotch;
  item.error = err.errors[0].message;
  LOG.info(`ERROR SAVING ITEM: ${JSON.stringify(item)}`);
  return item;
}

// FUNCTIONS TO RESPOND WITH JSON DATA  ----------------------------------------

// GET all JSON
module.exports.findAll = async (req, res) => {
  (await db).models.Whiskey.findAll()
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
  (await db).models.Whiskey.findByPk(id)
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
    await context.models.Whiskey.create(req.body);
    return res.redirect('/whiskey');
  } catch (err) {
    if (err instanceof ValidationError) {
      const item = await prepareInvalidItem(err, req);
      res.locals.whiskey = item;
      return res.render('whiskey/create.ejs', { title: 'Whiskeys', res });
    }
    return res.redirect('/whiskey');
  }
};

// POST /save/:id
module.exports.saveEdit = async (req, res) => {
  try {
    const reqId = parseInt(req.params.id, 10);
    const context = await db;
    const updated = await context.models.Whiskey.update(req.body, {
      where: { id: reqId },
    });
    LOG.info(`Updated: ${JSON.stringify(updated)}`);
    return res.redirect('/whiskey');
  } catch (err) {
    if (err instanceof ValidationError) {
      const item = await prepareInvalidItem(err, req);
      res.locals.whiskey = item;
      return res.render('whiskey/edit.ejs', { title: 'Whiskeys', res });
    }
    return res.redirect('/whiskey');
  }
};

// POST /delete/:id
module.exports.deleteItem = async (req, res) => {
  try {
    const reqId = parseInt(req.params.id, 10);
    const deleted = (await db).models.Whiskey.destroy({
      where: { id: reqId },
    });
    if (deleted) {
      return res.redirect('/whiskey');
    }
    throw new Error(`${reqId} not found`);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

// RESPOND WITH VIEWS  --------------------------------------------

// GET to this controller base URI (the default)
module.exports.showIndex = async (req, res) => {
  (await db).models.Whiskey.findAll()
    .then((data) => {
      res.locals.whiskeys = data;
      res.render('whiskey/index.ejs', { title: 'Whiskeys', res });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Error retrieving all.',
      });
    });
};

// GET /create
module.exports.showCreate = async (req, res) => {
  // create a temp whiskey and add it to the response.locals object
  // this will provide a whiskey object to put any validation errors
  const tempItem = {
    name: 'WhiskeyName',
    age: 1,
    isScotch: true,
  };
  res.locals.whiskey = tempItem;
  res.render('whiskey/create.ejs', { title: 'Whiskeys', res });
};

// GET /delete/:id
module.exports.showDelete = async (req, res) => {
  const { id } = req.params;
  (await db).models.Whiskey.findByPk(id)
    .then((data) => {
      res.locals.whiskey = data;
      if (data) {
        res.render('whiskey/delete.ejs', { title: 'Whiskeys', res });
      } else {
        res.redirect('whiskey/');
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
  (await db).models.Whiskey.findByPk(id)
    .then((data) => {
      res.locals.whiskey = data;
      res.render('whiskey/details.ejs', { title: 'Whiskeys', res });
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
  (await db).models.Whiskey.findByPk(id)
    .then((data) => {
      res.locals.whiskey = data;
      res.render('whiskey/edit.ejs', { title: 'Whiskeys', res });
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error retrieving item with id=${id}: ${err.message}`,
      });
    });
};

/**
 *  ship controller
 *  Handles requests related to ships (see routes)
 *
 * @author Sam Ritter <s523855@nwmissouri.edu>
 */

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
  item.guns = req.body.guns;
  item.isFictional = req.body.isFictional;
  item.error = err.errors[0].message;
  LOG.info(`ERROR SAVING ITEM: ${JSON.stringify(item)}`);
  return item;
}

// FUNCTIONS TO RESPOND WITH JSON DATA  ----------------------------------------

// GET all JSON
exports.findAll = async (req, res) => {
  (await db).models.Ship.findAll()
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
  (await db).models.Ship.findByPk(id)
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
    await context.models.Ship.create(req.body);
    return res.redirect('/ship');
  } catch (err) {
    if (err instanceof ValidationError) {
      const item = await prepareInvalidItem(err, req);
      res.locals.ship = item;
      return res.render('ship/create.ejs', { title: 'Ships', res });
    }
    return res.redirect('/ship');
  }
};

// POST /save/:id
exports.saveEdit = async (req, res) => {
  try {
    const reqId = parseInt(req.params.id, 10);
    const context = await db;
    const updated = await context.models.Ship.update(req.body, {
      where: { id: reqId },
    });
    LOG.info(`Updated: ${JSON.stringify(updated)}`);
    return res.redirect('/ship');
  } catch (err) {
    if (err instanceof ValidationError) {
      const item = await prepareInvalidItem(err, req);
      res.locals.ship = item;
      return res.render('ship/edit.ejs', { title: 'Ships', res });
    }
    return res.redirect('/ship');
  }
};

// POST /delete/:id
exports.deleteItem = async (req, res) => {
  try {
    const reqId = parseInt(req.params.id, 10);
    const deleted = (await db).models.Ship.destroy({
      where: { id: reqId },
    });
    if (deleted) {
      return res.redirect('/ship');
    }
    throw new Error(`${reqId} not found`);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

// RESPOND WITH VIEWS  --------------------------------------------

// GET to this controller base URI (the default)
exports.showIndex = async (req, res) => {
  // res.send('NOT IMPLEMENTED: Will show ship/index.ejs');
  (await db).models.Ship.findAll()
    .then((data) => {
      res.locals.ships = data;
      res.render('ship/index.ejs', { title: 'Ships', res });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Error retrieving all.',
      });
    });
};

// GET /create
exports.showCreate = async (req, res) => {
  // create a temp ship and add it to the response.locals object
  // this will provide a ship object to put any validation errors
  const tempItem = {
    name: 'ShipName',
    guns: 1,
    isFictional: true,
  };
  res.locals.ship = tempItem;
  res.render('ship/create.ejs', { title: 'Ships', res });
};

// GET /delete/:id
exports.showDelete = async (req, res) => {
  const { id } = req.params;
  (await db).models.Ship.findByPk(id)
    .then((data) => {
      res.locals.ship = data;
      if (data) {
        res.render('ship/delete.ejs', { title: 'Ships', res });
      } else {
        res.redirect('ship/');
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
  (await db).models.Ship.findByPk(id)
    .then((data) => {
      res.locals.ship = data;
      res.render('ship/details.ejs', { title: 'Ships', res });
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
  (await db).models.Ship.findByPk(id)
    .then((data) => {
      res.locals.ship = data;
      res.render('ship/edit.ejs', { title: 'Ships', res });
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error retrieving item with id=${id}: ${err.message}`,
      });
    });
};

/**
 *  plant controller
 *  Handles requests related to plant (see routes)
 *
 * @author Sreenidhi Madala <s541226@nwmissouri.edu>
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
  item.variety = req.body.variety;
  item.isPlant = req.body.isPlant;
  item.error = err.errors[0].message;
  LOG.info(`ERROR SAVING ITEM: ${JSON.stringify(item)}`);
  return item;
}

// FUNCTIONS TO RESPOND WITH JSON DATA  ----------------------------------------

// GET all JSON
exports.findAll = async (req, res) => {
  (await db).models.Plant.findAll()
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
  (await db).models.Plant.findByPk(id)
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
    await context.models.Plant.create(req.body);
    return res.redirect('/plant');
  } catch (err) {
    if (err instanceof ValidationError) {
      const item = await prepareInvalidItem(err, req);
      res.locals.plant = item;
      return res.render('plant/create.ejs', { title: 'Plants', res });
    }
    return res.redirect('/plant');
  }
};

// POST /save/:id
exports.saveEdit = async (req, res) => {
  try {
    const reqId = parseInt(req.params.id, 10);
    const context = await db;
    const updated = await context.models.Plant.update(req.body, {
      where: { id: reqId },
    });
    LOG.info(`Updated: ${JSON.stringify(updated)}`);
    return res.redirect('/plant');
  } catch (err) {
    if (err instanceof ValidationError) {
      const item = await prepareInvalidItem(err, req);
      res.locals.plant = item;
      return res.render('plant/edit.ejs', { title: 'Plants', res });
    }
    return res.redirect('/plant');
  }
};

// POST /delete/:id
exports.deleteItem = async (req, res) => {
  try {
    const reqId = parseInt(req.params.id, 10);
    const deleted = (await db).models.Plant.destroy({
      where: { id: reqId },
    });
    if (deleted) {
      return res.redirect('/plant');
    }
    throw new Error(`${reqId} not found`);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

// RESPOND WITH VIEWS  --------------------------------------------

// GET to this controller base URI (the default)
exports.showIndex = async (req, res) => {
  (await db).models.Plant.findAll()
    .then((data) => {
      res.locals.plants = data;
      res.render('plant/index.ejs', { title: 'Plants', res });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Error retrieving all.',
      });
    });
};

// GET /create
exports.showCreate = async (req, res) => {
  // create a temp plant and add it to the response.locals object
  // this will provide a plant object to put any validation errors
  const tempItem = {
    name: 'PlantName',
    variety: 1,
    isPlant: true,
  };
  res.locals.plant = tempItem;
  res.render('plant/create.ejs', { title: 'Plants', res });
};

// GET /delete/:id
exports.showDelete = async (req, res) => {
  const { id } = req.params;
  (await db).models.Plant.findByPk(id)
    .then((data) => {
      res.locals.plant = data;
      if (data) {
        res.render('plant/delete.ejs', { title: 'Plants', res });
      } else {
        res.redirect('plant/');
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
  (await db).models.Plant.findByPk(id)
    .then((data) => {
      res.locals.plant = data;
      res.render('plant/details.ejs', { title: 'Plants', res });
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
  (await db).models.Plant.findByPk(id)
    .then((data) => {
      res.locals.plant = data;
      res.render('plant/edit.ejs', { title: 'Plants', res });
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error retrieving item with id=${id}: ${err.message}`,
      });
    });
};

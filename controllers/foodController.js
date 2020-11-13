/**
 *  food controller
 *  Handles requests related to food (see routes)
 *
 * @author Sri Vasavi Vipparla <S540791@nwmissouri.edu>
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
  item.pricePerLB = req.body.pricePerLB;
  item.isMeat = req.body.isMeat;
  item.error = err.errors[0].message;
  LOG.info(`ERROR SAVING ITEM: ${JSON.stringify(item)}`);
  return item;
}

// FUNCTIONS TO RESPOND WITH JSON DATA  ----------------------------------------

// GET all JSON
exports.findAll = async (req, res) => {
  (await db).models.food
    .findAll()
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
  (await db).models.food
    .findByPk(id)
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
    await context.models.food.create(req.body);
    return res.redirect('/food');
  } catch (err) {
    if (err instanceof ValidationError) {
      const item = await prepareInvalidItem(err, req);
      res.locals.food = item;
      return res.render('food/create.ejs', { title: 'foods', res });
    }
    return res.redirect('/food');
  }
};

// POST /save/:id
exports.saveEdit = async (req, res) => {
  try {
    const reqId = parseInt(req.params.id, 10);
    const context = await db;
    const updated = await context.models.food.update(req.body, {
      where: { id: reqId },
    });
    LOG.info(`Updated: ${JSON.stringify(updated)}`);
    return res.redirect('/food');
  } catch (err) {
    if (err instanceof ValidationError) {
      const item = await prepareInvalidItem(err, req);
      res.locals.food = item;
      return res.render('food/edit.ejs', { title: 'foods', res });
    }
    return res.redirect('/food');
  }
};

// POST /delete/:id
exports.deleteItem = async (req, res) => {
  try {
    const reqId = parseInt(req.params.id, 10);
    const deleted = (await db).models.food.destroy({
      where: { id: reqId },
    });
    if (deleted) {
      return res.redirect('/food');
    }
    throw new Error(`${reqId} not found`);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

// RESPOND WITH VIEWS  --------------------------------------------

// GET to this controller base URI (the default)
exports.showIndex = async (req, res) => {
  (await db).models.food
    .findAll()
    .then((data) => {
      res.locals.foods = data;
      res.render('food/index.ejs', { title: 'foods', res });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Error retrieving all.',
      });
    });
};

// GET /create
exports.showCreate = async (req, res) => {
  // create a temp food and add it to the response.locals object
  // this will provide a food object to put any validation errors
  const tempItem = {
    name: 'foodName',
    pricePerLB: 1,
    isMeat: true,
  };
  res.locals.food = tempItem;
  res.render('food/create.ejs', { title: 'foods', res });
};

// GET /delete/:id
exports.showDelete = async (req, res) => {
  const { id } = req.params;
  (await db).models.food
    .findByPk(id)
    .then((data) => {
      res.locals.food = data;
      if (data) {
        res.render('food/delete.ejs', { title: 'foods', res });
      } else {
        res.redirect('food/');
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
  (await db).models.food
    .findByPk(id)
    .then((data) => {
      res.locals.food = data;
      res.render('food/details.ejs', { title: 'foods', res });
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
  (await db).models.food
    .findByPk(id)
    .then((data) => {
      res.locals.food = data;
      res.render('food/edit.ejs', { title: 'foods', res });
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error retrieving item with id=${id}: ${err.message}`,
      });
    });
};

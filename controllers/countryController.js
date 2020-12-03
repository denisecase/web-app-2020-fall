/**
 *  Country controller
 *  Handles requests related to country (see routes)
 *
 * @author Felipe Sato <s531355@nwmissouri.edu>
 */

const { ValidationError } = require('sequelize');

const LOG = require('../util/logger');

const db = require('../models/index');

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
  item.population = req.body.population;
  item.isPopulationMoreThan100M = req.body.isPopulationMoreThan100M;
  item.error = err.errors[0].message;
  LOG.info(`ERROR SAVING ITEM: ${JSON.stringify(item)}`);
  return item;
}

// FUNCTIONS TO RESPOND WITH JSON DATA  ----------------------------------------

// GET all JSON
module.exports.findAll = async (req, res) => {
  (await db).models.country.findAll()
module.exports.findAll = (req, res) => {
  db.models.country
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
module.exports.findOne = async (req, res) => {
module.exports.findOne = (req, res) => {
  const { id } = req.params;
  (await db).models.country
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
module.exports.saveNew = async (req, res) => {
  try {
    const context = await db;
    await context.models.country.create(req.body);
    return res.redirect('/country');
  } catch (error) {
    if (err instanceof ValidationError) {
      const item = await prepareInvalidItem(err, req);
      res.locals.country = item;
      return res.render('country/create.ejs', { title: 'country', res });
    }
    return res.redirect('/country');
  }
};

// POST /save/:id
module.exports.saveEdit = async (req, res) => {
  try {
    const reqId = parseInt(req.params.id, 10);
    const context = await db;
    const updated = await context.models.country.update(req.body, {
      where: { id: reqId },
    });
    LOG.info(`Updated: ${JSON.stringify(updated)}`);
    return res.redirect('/country');
  } catch (err) {
    if (err instanceof ValidationError) {
      const item = await prepareInvalidItem(err, req);
      res.locals.country = item;
      return res.render('country/edit.ejs', { title: 'countrys', res });
    }
    return res.redirect('/country');
  }
};

// POST /delete/:id
module.exports.deleteItem = async (req, res) => {
  try {
    const reqId = parseInt(req.params.id, 10);
    const deleted = (await db).models.country.destroy({
      where: { id: reqId },
    });
    if (deleted) {
      return res.redirect('/country');
    }
    throw new Error(`${reqId} not found`);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

// RESPOND WITH VIEWS  --------------------------------------------

// GET to this controller base URI (the default)
module.exports.showIndex = async (req, res) => {
module.exports.showIndex = (req, res) => {
  // res.send('NOT IMPLEMENTED: Will show country/index.ejs');
 (await db).models.country
   .findAll()
   .then((data) => {
   res.locals.countrys = data;
   res.render('country/index.ejs', { title: 'countrys', res });
  })
  .catch((err) => {
      res.status(500).send({
        message: err.message || 'Error retrieving all.',
      });
    });
};

// GET /create
module.exports.showCreate = async (req, res) => {
  // create a temp country and add it to the response.locals object
  // this will provide a country object to put any validation errors
  const tempItem = {
    name: 'countryName',
    population: 1,
    isPopulationMoreThan100M: true,
  };
  res.locals.country = tempItem;
  res.render('country/create.ejs', { title: 'countrys', res });
};

// GET /delete/:id
module.exports.showDelete = async (req, res) => {
  const { id } = req.params;
  (await db).models.country
    .findByPk(id)
    .then((data) => {
      res.locals.country = data;
      if (data) {
        res.render('country/delete.ejs', { title: 'countrys', res });
      } else {
        res.redirect('country/');
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
  (await db).models.country
    .findByPk(id)
    .then((data) => {
      res.locals.country = data;
      res.render('country/details.ejs', { title: 'countrys', res });
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
  (await db).models.country
    .findByPk(id)
    .then((data) => {
      res.locals.country = data;
      res.render('country/edit.ejs', { title: 'countrys', res });
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error retrieving item with id=${id}: ${err.message}`,
      });
    });

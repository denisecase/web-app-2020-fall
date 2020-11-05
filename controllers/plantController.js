/**
 *  plant controller
 *  Handles requests related to plant (see routes)
 *
 * @author Sreenidhi Madala <s541226@nwmissouri.edu>
 */

const LOG = require('../util/logger');

const db = require('../models/index')();

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
  // create behaves poorly
  const context = await db;
  try {
    context.models.Plant.create(req.body);
  } catch (err) {
    // store the user inputs & the validation errors in res.locals.plant
    // err includes err.message & err.errors (array of validator msgs)
    LOG.error('ERROR SAVING PLANT');
    const item = {};
    item.name = req.body.name;
    item.varieties = req.body.varieties;
    item.isPlant = req.body.isPlant;
    item.errors = err.errors;
    res.locals.plant = item;
    LOG.info(` ERROR ADDING PLANT:${item}`);
  }
  return res.redirect('/plant');
};

// POST /save/:id
exports.saveEdit = async (req, res) => {
  try {
    const reqId = parseInt(req.params.id, 10);
    LOG.info(`Save id: ${reqId}`);
    // don't use super-current language features unless you add babel
    const updated = (await db).models.Plant.update(req.body, {
      where: { id: reqId },
    });
    LOG.info(`Updated: ${updated}`);
    return res.redirect('/plant'); // always redirect back for now
  } catch (err) {
    return res.status(500).send(err.message);
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
    varieties: 1,
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

/**
 *  Chief controller
 *  Handles requests related to chiefs (see routes)
 *
 * @author Jack W Beaver <s526937@nwmissouri.edu>
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
  item.name = req.body.player;
  item.playerCount = req.body.teamSince;
  item.isCardchief = req.body.isSuperBowlChamp;
  item.error = err.errors[0].message;
  LOG.info(`ERROR SAVING ITEM: ${JSON.stringify(item)}`);
  return item;
}
// FUNCTIONS TO RESPOND WITH JSON DATA  ----------------------------------------

// GET all JSON
module.exports.findAll = async (req, res) => {
  (await db).models.Chief.findAll()
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
  (await db).models.Chief.findByPk(id)
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
    await context.models.chief.create(req.body);
    return res.redirect('/chief');
  } catch (err) {
    if (err instanceof ValidationError) {
      const item = await prepareInvalidItem(err, req);
      res.locals.chief = item;
      return res.render('chief/create.ejs', { title: 'chiefs', res });
    }
    return res.redirect('/chief');
  }
};

// POST /save/:id
module.exports.saveEdit = async (req, res) => {
  try {
    const reqId = parseInt(req.params.id, 10);
    const context = await db;
    const updated = await context.models.chief.update(req.body, {
      where: { id: reqId },
    });
    LOG.info(`Updated: ${JSON.stringify(updated)}`);
    return res.redirect('/chief');
  } catch (err) {
    if (err instanceof ValidationError) {
      const item = await prepareInvalidItem(err, req);
      res.locals.chief = item;
      return res.render('chief/edit.ejs', { title: 'chiefs', res });
    }
    return res.redirect('/chief');
  }
};

// POST /delete/:id
module.exports.deleteItem = async (req, res) => {
  try {
    const reqId = parseInt(req.params.id, 10);
    const deleted = (await db).models.chief.destroy({
      where: { id: reqId },
    });
    if (deleted) {
      return res.redirect('/chief');
    }
    throw new Error(`${reqId} not found`);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

// RESPOND WITH VIEWS  --------------------------------------------

// GET to this controller base URI (the default)
module.exports.showIndex = async (req, res) => {
  // res.send('NOT IMPLEMENTED: Will show chief/index.ejs');
  (await db).models.chief
    .findAll()
    .then((data) => {
      res.locals.chiefs = data;
      res.render('chief/index.ejs', { title: 'chiefs', res });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Error retrieving all.',
      });
    });
};

// GET /create
module.exports.showCreate = async (req, res) => {
  // create a temp chief and add it to the response.locals object
  // this will provide a chief object to put any validation errors
  const tempItem = {
    name: 'chiefName',
    playerCount: 1,
    isCardchief: true,
  };
  res.locals.chief = tempItem;
  res.render('chief/create.ejs', { title: 'chiefs', res });
};

// GET /delete/:id
module.exports.showDelete = async (req, res) => {
  const { id } = req.params;
  (await db).models.chief
    .findByPk(id)
    .then((data) => {
      res.locals.chief = data;
      if (data) {
        res.render('chief/delete.ejs', { title: 'chiefs', res });
      } else {
        res.redirect('chief/');
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
  (await db).models.chief
    .findByPk(id)
    .then((data) => {
      res.locals.chief = data;
      res.render('chief/details.ejs', { title: 'chiefs', res });
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
  (await db).models.chief
    .findByPk(id)
    .then((data) => {
      res.locals.chief = data;
      res.render('chief/edit.ejs', { title: 'chiefs', res });
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error retrieving item with id=${id}: ${err.message}`,
      });
    });
};

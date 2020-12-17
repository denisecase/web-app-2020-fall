/**
 *  Clue controller
 *  Handles requests related to this resource (see routes)
 *
 * @author Denise Case <dcase@nwmissouri.edu>
 */

// const { ValidationError } = require('sequelize');
const LOG = require('../util/logger');
const db = require('../models/index')();

const tabTitle = 'Clues';

// FUNCTIONS TO RESPOND WITH JSON DATA  ----------------------------------------

// GET all JSON
module.exports.findAll = async (req, res) => {
  (await db).models.Clue.findAll({
    attributes: {
      exclude: ['createdAt', 'updatedAt'],
    },
    include: {
      model: (await db).models.Location,
      attributes: ['id', 'name'],
    },
  })
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
  (await db).models.Clue.findByPk(id)
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
    await context.models.Clue.create(req.body);
    return res.redirect('/clue');
  } catch (err) {
    // if (err instanceof ValidationError) {
    //   const item = await prepareInvalidItem(err, req);
    //   res.locals.clue = item;
    //   return res.render('clue/create.ejs', { title: tabTitle, res });
    // }
    return res.redirect('/clue');
  }
};

// POST /save/:id
module.exports.saveEdit = async (req, res) => {
  try {
    const reqId = parseInt(req.params.id, 10);
    const context = await db;
    const updated = await context.models.Clue.update(req.body, {
      where: { id: reqId },
    });
    LOG.info(`Updated: ${JSON.stringify(updated)}`);
    return res.redirect('/clue');
  } catch (err) {
    // if (err instanceof ValidationError) {
    //   const item = await prepareInvalidItem(err, req);
    //   res.locals.clue = item;
    //   return res.render('clue/edit.ejs', { title: tabTitle, res });
    // }
    return res.redirect('/clue');
  }
};

// POST /delete/:id
module.exports.deleteItem = async (req, res) => {
  try {
    const reqId = parseInt(req.params.id, 10);
    const deleted = (await db).models.Clue.destroy({
      where: { id: reqId },
    });
    if (deleted) {
      return res.redirect('/clue');
    }
    throw new Error(`${reqId} not found`);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

// RESPOND WITH VIEWS  --------------------------------------------

// GET to this controller base URI (the default)
module.exports.showIndex = async (req, res) => {
  (await db).models.Clue.findAll()
    .then((data) => {
      res.locals.clues = data;
      res.render('clue/index.ejs', { title: tabTitle, res });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Error retrieving all.',
      });
    });
};

// GET /create
module.exports.showCreate = async (req, res) => {
  // create a temporary item and add it to the response.locals object
  // this also provides a place to pass any validation errors to the view
  // Important! attributes must match those defined in the model
  const tempItem = {
    name: 'ClueName',
  };
  res.locals.clue = tempItem;
  res.render('clue/create.ejs', { title: tabTitle, res });
};

// GET /delete/:id
module.exports.showDelete = async (req, res) => {
  const { id } = req.params;
  (await db).models.Clue.findByPk(id)
    .then((data) => {
      res.locals.clue = data;
      if (data) {
        res.render('clue/delete.ejs', { title: tabTitle, res });
      } else {
        res.redirect('clue/');
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
  (await db).models.Clue.findByPk(id)
    .then((data) => {
      res.locals.clue = data;
      res.render('clue/details.ejs', { title: tabTitle, res });
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
  (await db).models.Clue.findByPk(id)
    .then((data) => {
      res.locals.clue = data;
      res.render('clue/edit.ejs', { title: tabTitle, res });
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error retrieving item with id=${id}: ${err.message}`,
      });
    });
};

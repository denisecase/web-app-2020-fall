/**
 *  dance controller
 *  Handles requests related to dance (see routes)
 *
 * @author Sai Prashansa Ambarkar <S541063@nwmissouri.edu>
 */

const LOG = require('../util/logger');

const db = require('../models/index')();

// FUNCTIONS TO RESPOND WITH JSON DATA  ----------------------------------------

// GET all JSON
exports.findAll = async (req, res) => {
  (await db).models.Dance.findAll()
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
  (await db).models.Dance.findByPk(id)
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
    context.models.Dance.create(req.body);
  } catch (err) {
    // store the user inputs & the validation errors in res.locals.dance
    // err includes err.message & err.errors (array of validator msgs)
    LOG.error('ERROR SAVING RABBIT');
    const item = {};
    item.form = req.body.form;
    item.yearIntro = req.body.yearIntro;
    item.isTraditional = req.body.isTraditional;
    //item.errors = err.errors;
    res.locals.dance = item;
    LOG.info(` ERROR ADDING RABBIT:${item}`);
  }
  return res.redirect('/dance');
};

// POST /save/:id
exports.saveEdit = async (req, res) => {
  try {
    const reqId = parseInt(req.params.id, 10);
    LOG.info(`Save id: ${reqId}`);
    // don't use super-current language features unless you add babel
    const updated = (await db).models.Dance.update(req.body, {
      where: { id: reqId },
    });
    LOG.info(`Updated: ${updated}`);
    return res.redirect('/dance'); // always redirect back for now
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

// POST /delete/:id
exports.deleteItem = async (req, res) => {
  try {
    const reqId = parseInt(req.params.id, 10);
    const deleted = (await db).models.Dance.destroy({
      where: { id: reqId },
    });
    if (deleted) {
      return res.redirect('/dance');
    }
    throw new Error(`${reqId} not found`);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

// RESPOND WITH VIEWS  --------------------------------------------

// GET to this controller base URI (the default)
exports.showIndex = async (req, res) => {
  (await db).models.Dance.findAll()
    .then((data) => {
      res.locals.dances = data;
      res.render('dance/index.ejs', { title: 'Dances', res });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Error retrieving all.',
      });
    });
};

// GET /create
exports.showCreate = async (req, res) => {
  // create a temp dance and add it to the response.locals object
  // this will provide a dance object to put any validation errors
  const tempItem = {
    name: 'DanceName',
    yearIntro: 1999,
    isTraditional: true,
  };
  res.locals.dance = tempItem;
  res.render('dance/create.ejs', { title: 'Dances', res });
};

// GET /delete/:id
exports.showDelete = async (req, res) => {
  const { id } = req.params;
  (await db).models.Dance.findByPk(id)
    .then((data) => {
      res.locals.dance = data;
      if (data) {
        res.render('dance/delete.ejs', { title: 'Dances', res });
      } else {
        res.redirect('dance/');
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
  (await db).models.Dance.findByPk(id)
    .then((data) => {
      res.locals.dance = data;
      res.render('dance/details.ejs', { title: 'Dances', res });
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
  (await db).models.Dance.findByPk(id)
    .then((data) => {
      res.locals.dance = data;
      res.render('dance/edit.ejs', { title: 'Dances', res });
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error retrieving item with id=${id}: ${err.message}`,
      });
    });
};

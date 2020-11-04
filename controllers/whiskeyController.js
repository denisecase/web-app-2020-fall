/**
 *  whiskey controller
 *  Handles requests related to whiskeys (see routes)
 *
 * @author Stephen Burke <burke.stephenpaul@gmail.com>
 */

// import dependencies
// const express = require('express');

// import local code files
// const model = require('../models/whiskey.js');

// create a router
// const router = express.Router();

// module.exports = router;

const db = require('../models/index');

// FUNCTIONS TO RESPOND WITH JSON DATA  ----------------------------------------

// GET all JSON
exports.findAll = (req, res) => {
  db.models.Whiskey.findAll()
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
exports.findOne = (req, res) => {
  const { id } = req.params;
  db.models.Whiskey.findByPk(id)
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
    await db.models.Whiskey.create(req.body);
    return res.redirect('/whiskey');
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// POST /save/:id
exports.saveEdit = async (req, res) => {
  try {
    const { reqId } = req.params.id;
    const [updated] = await db.models.Whiskey.update(req.body, {
      where: { id: reqId },
    });
    if (updated) {
      return res.redirect('/whiskey');
    }
    throw new Error(`${reqId} not found`);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

// POST /delete/:id
exports.deleteItem = async (req, res) => {
  try {
    const { reqId } = req.params.whiskeyId;
    const deleted = await db.models.Whiskey.destroy({
      where: { id: reqId },
    });
    if (deleted) {
      return res.redirect('/whiskey');
    }
    throw new Error(`${reqId} not found`);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

// RESPOND WITH VIEWS  --------------------------------------------

// GET to this controller base URI (the default)
exports.showIndex = (req, res) => {
  db.models.Whiskey.findAll()
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
exports.showCreate = (req, res) => {
  res.render('whiskey/create.ejs', {
    title: 'Whiskeys',
    res,
    name: '',
    age: '',
    isCartoon: '',
  });
};

// GET /delete/:id
exports.showDelete = (req, res) => {
  const { id } = req.params;
  db.models.Whiskey.findByPk(id)
    .then((data) => {
      res.locals.whiskey = data;
      res.render('whiskey/delete.ejs', { title: 'Whiskeys', res });
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error retrieving item with id=${id}: ${err.message}`,
      });
    });
};

// GET /details/:id
exports.showDetails = (req, res) => {
  const { id } = req.params;
  db.models.Whiskey.findByPk(id)
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
exports.showEdit = (req, res) => {
  const { id } = req.params;
  db.models.Whiskey.findByPk(id)
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

/**
 *  book controller
 *  Handles requests related to book (see routes)
 *
 * @author shivani tangellapally <s540965@nwmissouri.edu>
 */
// const { ValidationError } = require('sequelize');
const LOG = require('../util/logger');

const db = require('../models/index')();

// FUNCTIONS TO RESPOND WITH JSON DATA  ----------------------------------------

// GET all JSON
module.exports.findAll = async (req, res) => {
  (await db).models.Book.findAll()
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
  (await db).models.Book.findByPk(id)
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
  // create behaves poorly
  const context = await db;
  try {
    context.models.Book.create(req.body);
  } catch (err) {
    // store the user inputs & the validation errors in res.locals.book
    // err includes err.message & err.errors (array of validator msgs)
    LOG.error('ERROR SAVING BOOK');
    const item = {};
    item.body = req.body.body;
    item.publishedDate = req.body.publishedDate;
    item.isFantasy = req.body.isFantasy;
    item.errors = err.errors;
    res.locals.book = item;
    LOG.info(` ERROR ADDING BOOK:${item}`);
  }
  return res.redirect('/book');
};

// POST /save/:id
module.exports.saveEdit = async (req, res) => {
  try {
    const reqId = parseInt(req.params.id, 10);
    LOG.info(`Save id: ${reqId}`);
    // don't use super-current language features unless you add babel
    const updated = (await db).models.Book.update(req.body, {
      where: { id: reqId },
    });
    LOG.info(`Updated: ${updated}`);
    return res.redirect('/book'); // always redirect back for now
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

// POST /delete/:id
module.exports.deleteItem = async (req, res) => {
  try {
    const reqId = parseInt(req.params.id, 10);
    const deleted = (await db).models.Book.destroy({
      where: { id: reqId },
    });
    if (deleted) {
      return res.redirect('/book');
    }
    throw new Error(`${reqId} not found`);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

// RESPOND WITH VIEWS  --------------------------------------------

// GET to this controller base URI (the default)
module.exports.showIndex = async (req, res) => {
  (await db).models.Book.findAll()
    .then((data) => {
      res.locals.books = data;
      res.render('book/index.ejs', { title: 'Books', res });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Error retrieving all.',
      });
    });
};

// GET /create
module.exports.showCreate = async (req, res) => {
  // create a temp book and add it to the response.locals object
  // this will provide a book object to put any validation errors
  const tempItem = {
    book: 'book',
    publishedDate: 1997,
    isFantasy: true,
  };
  res.locals.book = tempItem;
  res.render('book/create.ejs', { title: 'Books', res });
};

// GET /delete/:id
module.exports.showDelete = async (req, res) => {
  const { id } = req.params;
  (await db).models.Book.findByPk(id)
    .then((data) => {
      res.locals.book = data;
      if (data) {
        res.render('book/delete.ejs', { title: 'Books', res });
      } else {
        res.redirect('book/');
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
  (await db).models.Book.findByPk(id)
    .then((data) => {
      res.locals.book = data;
      res.render('book/details.ejs', { title: 'Books', res });
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
  (await db).models.Book.findByPk(id)
    .then((data) => {
      res.locals.book = data;
      res.render('book/edit.ejs', { title: 'Books', res });
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error retrieving item with id=${id}: ${err.message}`,
      });
    });
};

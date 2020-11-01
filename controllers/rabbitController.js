/**
 *  Rabbit controller
 *  Handles requests related to rabbits (see routes)
 *
 * @author Denise Case <dcase@nwmissouri.edu>
 */
const LOG = require('../util/logger');

const db = require('../models/index')();

// FUNCTIONS TO RESPOND WITH JSON DATA  ----------------------------------------

// GET all JSON
exports.findAll = async (req, res) => {
  (await db).models.Rabbit.findAll()
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
  (await db).models.Rabbit.findByPk(id)
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
    (await db).models.Rabbit.create(req.body);
    return res.redirect('/rabbit');
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// POST /save/:id
exports.saveEdit = async (req, res) => {
  try {
    const reqId = parseInt(req.params.id, 10);
    LOG.info(`Save id: ${reqId}`);
    // don't use super-current language features unless you add babel
    const updated = (await db).models.Rabbit.update(req.body, {
      where: { id: reqId },
    });
    LOG.info(`Updated: ${updated}`);
    return res.redirect('/rabbit'); // always redirect back for now
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

// POST /delete/:id
exports.deleteItem = async (req, res) => {
  try {
    const reqId = parseInt(req.params.id, 10);
    const deleted = (await db).models.Rabbit.destroy({
      where: { id: reqId },
    });
    if (deleted) {
      return res.redirect('/rabbit');
    }
    throw new Error(`${reqId} not found`);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

// RESPOND WITH VIEWS  --------------------------------------------

// GET to this controller base URI (the default)
exports.showIndex = async (req, res) => {
  (await db).models.Rabbit.findAll()
    .then((data) => {
      res.locals.rabbits = data;
      res.render('rabbit/index.ejs', { title: 'Rabbits', res });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Error retrieving all.',
      });
    });
};

// GET /create
exports.showCreate = async (req, res) => {
  res.render('rabbit/create.ejs', {
    title: 'Rabbits',
    res,
    name: '',
    age: '',
    isCartoon: '',
  });
};

// GET /delete/:id
exports.showDelete = async (req, res) => {
  const { id } = req.params;
  (await db).models.Rabbit.findByPk(id)
    .then((data) => {
      res.locals.rabbit = data;
      if (data) {
        res.render('rabbit/delete.ejs', { title: 'Rabbits', res });
      } else {
        res.redirect('rabbit/');
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
  (await db).models.Rabbit.findByPk(id)
    .then((data) => {
      res.locals.rabbit = data;
      res.render('rabbit/details.ejs', { title: 'Rabbits', res });
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
  (await db).models.Rabbit.findByPk(id)
    .then((data) => {
      res.locals.rabbit = data;
      res.render('rabbit/edit.ejs', { title: 'Rabbits', res });
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error retrieving item with id=${id}: ${err.message}`,
      });
    });
};

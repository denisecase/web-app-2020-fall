/**
 *  Video Game controller
 *  Handles requests related to Video Games (see routes)
 *
 * @author Kunal Vohra <S540786@nwmissouri.edu>
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
  item.playersNeeded = req.body.playersNeeded;
  item.isReleased = req.body.isReleased;
  item.error = err.errors[0].message;
  LOG.info(`ERROR SAVING ITEM: ${JSON.stringify(item)}`);
  return item;
}

// FUNCTIONS TO RESPOND WITH JSON DATA  ----------------------------------------

// GET all JSON
module.exports.findAll = async (req, res) => {
  (await db).models.videogame
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
  const { id } = req.params;
  (await db).models.videogame
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
    await context.models.videogame.create(req.body);
    return res.redirect('/videogame');
  } catch (err) {
    if (err instanceof ValidationError) {
      const item = await prepareInvalidItem(err, req);
      res.locals.videogame = item;
      return res.render('videogame/create.ejs', { title: 'videogame', res });
    }
    return res.redirect('/videogame');
  }
};

// POST /save/:id
module.exports.saveEdit = async (req, res) => {
  try {
    const reqId = parseInt(req.params.id, 10);
    const context = await db;
    const updated = await context.models.videogame.update(req.body, {
      where: { id: reqId },
    });
    LOG.info(`Updated: ${JSON.stringify(updated)}`);
    return res.redirect('/videogame');
  } catch (err) {
    if (err instanceof ValidationError) {
      const item = await prepareInvalidItem(err, req);
      res.locals.videogame = item;
      return res.render('videogame/edit.ejs', { title: 'videogame', res });
    }
    return res.redirect('/videogame');
  }
};

// POST /delete/:id
module.exports.deleteItem = async (req, res) => {
  try {
    const reqId = parseInt(req.params.id, 10);
    const deleted = (await db).models.videogame.destroy({
      where: { id: reqId },
    });
    if (deleted) {
      return res.redirect('/videogame');
    }
    throw new Error(`${reqId} not found`);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

// RESPOND WITH VIEWS  --------------------------------------------

// GET to this controller base URI (the default)
module.exports.showIndex = async (req, res) => {
  (await db).models.videogame
    .findAll()
    .then((data) => {
      res.locals.videogame = data;
      res.render('videogame/index.ejs', { title: 'videogame', res });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Error retrieving all.',
      });
    });
};

// GET /create
module.exports.showCreate = async (req, res) => {
  // create a temp videogame and add it to the response.locals object
  // this will provide a videogame object to put any validation errors
  const tempItem = {
    name: 'videogameName',
    playersNeeded: 1,
    isReleased: true,
  };
  res.locals.videogame = tempItem;
  res.render('videogame/create.ejs', { title: 'videogame', res });
};

// GET /delete/:id
module.exports.showDelete = async (req, res) => {
  const { id } = req.params;
  (await db).models.videogame
    .findByPk(id)
    .then((data) => {
      res.locals.videogame = data;
      if (data) {
        res.render('videogame/delete.ejs', { title: 'videogame', res });
      } else {
        res.redirect('videogame/');
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
  (await db).models.videogame
    .findByPk(id)
    .then((data) => {
      res.locals.videogame = data;
      res.render('videogame/details.ejs', { title: 'videogame', res });
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
  (await db).models.videogame
    .findByPk(id)
    .then((data) => {
      res.locals.videogame = data;
      res.render('videogame/edit.ejs', { title: 'videogame', res });
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error retrieving item with id=${id}: ${err.message}`,
      });
    });
};

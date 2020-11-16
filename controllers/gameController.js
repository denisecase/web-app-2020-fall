/**
 *  Game controller
 *  Handles requests related to games (see routes)
 *
 * @author Blake Bennett <s532542@nwmissouri.edu>
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
  item.playerCount = req.body.playerCount;
  item.isCardGame = req.body.isCardGame;
  item.error = err.errors[0].message;
  LOG.info(`ERROR SAVING ITEM: ${JSON.stringify(item)}`);
  return item;
}

// FUNCTIONS TO RESPOND WITH JSON DATA  ----------------------------------------

// GET all JSON
module.exports.findAll = async (req, res) => {
  (await db).models.Game.findAll()
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
  (await db).models.Game.findByPk(id)
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
    await context.models.Game.create(req.body);
    return res.redirect('/game');
  } catch (err) {
    if (err instanceof ValidationError) {
      const item = await prepareInvalidItem(err, req);
      res.locals.game = item;
      return res.render('game/create.ejs', { title: 'Gamess', res });
    }
    return res.redirect('/game');
  }
};

// POST /save/:id
module.exports.saveEdit = async (req, res) => {
  try {
    const reqId = parseInt(req.params.id, 10);
    const context = await db;
    const updated = await context.models.Game.update(req.body, {
      where: { id: reqId },
    });
    LOG.info(`Updated: ${JSON.stringify(updated)}`);
    return res.redirect('/game');
  } catch (err) {
    if (err instanceof ValidationError) {
      const item = await prepareInvalidItem(err, req);
      res.locals.game = item;
      return res.render('game/edit.ejs', { title: 'Games', res });
    }
    return res.redirect('/game');
  }
};

// POST /delete/:id
module.exports.deleteItem = async (req, res) => {
  try {
    const reqId = parseInt(req.params.id, 10);
    const deleted = (await db).models.Game.destroy({
      where: { id: reqId },
    });
    if (deleted) {
      return res.redirect('/game');
    }
    throw new Error(`${reqId} not found`);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

// RESPOND WITH VIEWS  --------------------------------------------

// GET to this controller base URI (the default)
module.exports.showIndex = async (req, res) => {
  // res.send('NOT IMPLEMENTED: Will show game/index.ejs');
  (await db).models.Game.findAll()
    .then((data) => {
      res.locals.games = data;
      res.render('game/index.ejs', { title: 'Games', res });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Error retrieving all.',
      });
    });
};

// GET /create
module.exports.showCreate = async (req, res) => {
  // create a temp game and add it to the response.locals object
  // this will provide a game object to put any validation errors
  const tempItem = {
    name: 'GameName',
    playerCount: 1,
    isCardGame: true,
  };
  res.locals.game = tempItem;
  res.render('game/create.ejs', { title: 'Games', res });
};

// GET /delete/:id
module.exports.showDelete = async (req, res) => {
  const { id } = req.params;
  (await db).models.Game.findByPk(id)
    .then((data) => {
      res.locals.game = data;
      if (data) {
        res.render('game/delete.ejs', { title: 'Games', res });
      } else {
        res.redirect('game/');
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
  (await db).models.Game.findByPk(id)
    .then((data) => {
      res.locals.game = data;
      res.render('game/details.ejs', { title: 'Games', res });
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
  (await db).models.Game.findByPk(id)
    .then((data) => {
      res.locals.game = data;
      res.render('game/edit.ejs', { title: 'Games', res });
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error retrieving item with id=${id}: ${err.message}`,
      });
    });
};

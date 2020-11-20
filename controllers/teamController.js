/**
 *  Team controller
 *  Handles requests related to this resource (see routes)
 *
 * @author Denise Case <dcase@nwmissouri.edu>
 */
// const { ValidationError } = require('sequelize');
const LOG = require('../util/logger');
const db = require('../models/index')();

const tabTitle = 'Teams';

// FUNCTIONS TO RESPOND WITH JSON DATA  ----------------------------------------

// GET all JSON
module.exports.findAll = async (req, res) => {
  (await db).models.Team.findAll()
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
  (await db).models.Team.findByPk(id)
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
    await context.models.Team.create(req.body);
    return res.redirect('/team');
  } catch (err) {
    // if (err instanceof ValidationError) {
    //   const item = await prepareInvalidItem(err, req);
    //   res.locals.team = item;
    //   return res.render('team/create.ejs', { title: tabTitle, res });
    // }
    return res.redirect('/team');
  }
};

// POST /save/:id
module.exports.saveEdit = async (req, res) => {
  try {
    const reqId = parseInt(req.params.id, 10);
    const context = await db;
    const updated = await context.models.Team.update(req.body, {
      where: { id: reqId },
    });
    LOG.info(`Updated: ${JSON.stringify(updated)}`);
    return res.redirect('/team');
  } catch (err) {
    // if (err instanceof ValidationError) {
    //   const item = await prepareInvalidItem(err, req);
    //   res.locals.team = item;
    //   return res.render('team/edit.ejs', { title: tabTitle, res });
    // }
    return res.redirect('/team');
  }
};

// POST /delete/:id
module.exports.deleteItem = async (req, res) => {
  try {
    const reqId = parseInt(req.params.id, 10);
    const deleted = (await db).models.Team.destroy({
      where: { id: reqId },
    });
    if (deleted) {
      return res.redirect('/team');
    }
    throw new Error(`${reqId} not found`);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

// RESPOND WITH VIEWS  --------------------------------------------

// GET to this controller base URI (the default)
module.exports.showIndex = async (req, res) => {
  (await db).models.Team.findAll()
    .then((data) => {
      res.locals.rabbits = data;
      res.render('team/index.ejs', { title: tabTitle, res });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Error retrieving all.',
      });
    });
};

// GET /create
module.exports.showCreate = async (req, res) => {
  // create a temp team and add it to the response.locals object
  // this will provide a team object to put any validation errors
  const tempItem = {
    name: 'RabbitName',
    age: 1,
    isCartoon: true,
  };
  res.locals.team = tempItem;
  res.render('team/create.ejs', { title: tabTitle, res });
};

// GET /delete/:id
module.exports.showDelete = async (req, res) => {
  const { id } = req.params;
  (await db).models.Team.findByPk(id)
    .then((data) => {
      res.locals.team = data;
      if (data) {
        res.render('team/delete.ejs', { title: tabTitle, res });
      } else {
        res.redirect('team/');
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
  (await db).models.Team.findByPk(id)
    .then((data) => {
      res.locals.team = data;
      res.render('team/details.ejs', { title: tabTitle, res });
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
  (await db).models.Team.findByPk(id)
    .then((data) => {
      res.locals.team = data;
      res.render('team/edit.ejs', { title: tabTitle, res });
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error retrieving item with id=${id}: ${err.message}`,
      });
    });
};

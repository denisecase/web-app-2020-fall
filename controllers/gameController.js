/**
 *  Game controller
 *  Handles requests related to games (see routes)
 *
 * @author Blake Bennett <s532542@nwmissouri.edu>
 */

const db = require('../models/index');

// FUNCTIONS TO RESPOND WITH JSON DATA  ----------------------------------------

// GET all JSON
exports.findAll = (req, res) => {
  db.models.game
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
exports.findOne = (req, res) => {
  const { id } = req.params;
  db.models.game
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
exports.saveNew = async (req, res) => {
  try {
    await db.models.game.create(req.body);
    return res.redirect('/game');
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// POST /save/:id
exports.saveEdit = async (req, res) => {
  try {
    const { reqId } = req.params.id;
    const [updated] = await db.models.game.update(req.body, {
      where: { id: reqId },
    });
    if (updated) {
      return res.redirect('/game');
    }
    throw new Error(`${reqId} not found`);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

// POST /delete/:id
exports.deleteItem = async (req, res) => {
  try {
    const { reqId } = req.params.gameId;
    const deleted = await db.models.game.destroy({
      where: { id: reqId },
    });
    if (deleted) {
      return res.redirect('/game');
    }
    throw new Error(`${reqId} not found`);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

// RESPOND WITH VIEWS  --------------------------------------------

// GET to this controller base URI (the default)
exports.showIndex = (req, res) => {
  // res.send('NOT IMPLEMENTED: Will show game/index.ejs');
  res.render('game/index.ejs', { title: 'games', req });
};

// GET /create
exports.showCreate = (req, res) => {
  res.send(`NOT IMPLEMENTED: Will show game/create.ejs for ${req.params.id}`);
};

// GET /delete/:id
exports.showDelete = (req, res) => {
  res.send(`NOT IMPLEMENTED: Will show game/delete.ejs for ${req.params.id}`);
};

// GET /details/:id
exports.showDetails = (req, res) => {
  res.send(`NOT IMPLEMENTED: Will show game/details.ejs for ${req.params.id}`);
};

// GET /edit/:id
exports.showEdit = (req, res) => {
  res.send(`NOT IMPLEMENTED: Will show game/edit.ejs for ${req.params.id}`);
};

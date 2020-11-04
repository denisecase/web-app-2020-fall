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
exports.findOne = (req, res) => {
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
exports.saveNew = async (req, res) => {
  try {
    await db.models.Game.create(req.body);
    return res.redirect('/game');
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// POST /save/:id
exports.saveEdit = async (req, res) => {
  try {
    const { reqId } = req.params.id;
    const [updated] = await db.models.Game.update(req.body, {
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
    const deleted = await db.models.Game.destroy({
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
  res.render('game/index.ejs', { title: 'Games', req });
};

// GET /create
exports.showCreate = (req, res) => {
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
exports.showDelete = (req, res) => {
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
exports.showDetails = async (req, res) => {
  const { id } = req.params;
  (await db).models.Game.findByPk(id)
    .then((data) => {
      res.locals.Game = data;
      res.render('game/details.ejs', { title: 'Games', res });
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

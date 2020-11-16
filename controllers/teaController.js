/**
 *  Tea controller
 *  Handles requests related to tea (see routes)
 *
 * @author Charles Hoot <hoot@nwmissouri.edu>
 */

const db = require('../models/index');

// FUNCTIONS TO RESPOND WITH JSON DATA  ----------------------------------------

// GET all JSON
module.exports.findAll = (req, res) => {
  db.models.Tea.findAll()
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
module.exports.findOne = (req, res) => {
  const { id } = req.params;
  db.models.Tea.findByPk(id)
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
    await db.models.Rabbit.create(req.body);
    return res.redirect('/tea');
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// POST /save/:id
module.exports.saveEdit = async (req, res) => {
  try {
    const { reqId } = req.params.id;
    const [updated] = await db.models.Tea.update(req.body, {
      where: { id: reqId },
    });
    if (updated) {
      return res.redirect('/tea');
    }
    throw new Error(`${reqId} not found`);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

// POST /delete/:id
module.exports.deleteItem = async (req, res) => {
  try {
    const { reqId } = req.params.rabbitId;
    const deleted = await db.models.Tea.destroy({
      where: { id: reqId },
    });
    if (deleted) {
      return res.redirect('/tea');
    }
    throw new Error(`${reqId} not found`);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

// RESPOND WITH VIEWS  --------------------------------------------

// GET to this controller base URI (the default)
module.exports.showIndex = (req, res) => {
  // res.send('NOT IMPLEMENTED: Will show tea/index.ejs');
  res.render('tea/index.ejs', { title: 'Teas', req });
};

// GET /create
module.exports.showCreate = (req, res) => {
  res.send(`NOT IMPLEMENTED: Will show tea/create.ejs for ${req.params.id}`);
};

// GET /delete/:id
module.exports.showDelete = (req, res) => {
  res.send(`NOT IMPLEMENTED: Will show tea/delete.ejs for ${req.params.id}`);
};

// GET /details/:id
module.exports.showDetails = (req, res) => {
  res.send(`NOT IMPLEMENTED: Will show tea/details.ejs for ${req.params.id}`);
};

// GET /edit/:id
module.exports.showEdit = (req, res) => {
  res.send(`NOT IMPLEMENTED: Will show tea/edit.ejs for ${req.params.id}`);
};

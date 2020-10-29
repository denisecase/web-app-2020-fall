/**
 *  plant controller
 *  Handles requests related to plant (see routes)
 *
 * @author Sreenidhi Madala <s541226@nwmissouri.edu>
 */

const db = require('../models/index');

// FUNCTIONS TO RESPOND WITH JSON DATA  ----------------------------------------

// GET all JSON
exports.findAll = (req, res) => {
  db.models.Plant.findAll()
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
  db.models.Plant.findByPk(id)
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
    await db.models.Plant.create(req.body);
    return res.redirect('/plant');
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// POST /save/:id
exports.saveEdit = async (req, res) => {
  try {
    const { reqId } = req.params.id;
    const [updated] = await db.models.Plant.update(req.body, {
      where: { id: reqId },
    });
    if (updated) {
      return res.redirect('/plant');
    }
    throw new Error(`${reqId} not found`);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

// POST /delete/:id
exports.deleteItem = async (req, res) => {
  try {
    const { reqId } = req.params.plantId;
    const deleted = await db.models.Plant.destroy({
      where: { id: reqId },
    });
    if (deleted) {
      return res.redirect('/plant');
    }
    throw new Error(`${reqId} not found`);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

// RESPOND WITH VIEWS  --------------------------------------------

// GET to this controller base URI (the default)
exports.showIndex = (req, res) => {
  // res.send('NOT IMPLEMENTED: Will show plant/index.ejs');
  res.render('plant/index.ejs', { title: 'plant', req });
};

// GET /create
exports.showCreate = (req, res) => {
  res.send(`NOT IMPLEMENTED: Will show plant/create.ejs for ${req.params.id}`);
};

// GET /delete/:id
exports.showDelete = (req, res) => {
  res.send(`NOT IMPLEMENTED: Will show plant/delete.ejs for ${req.params.id}`);
};

// GET /details/:id
exports.showDetails = (req, res) => {
  res.send(`NOT IMPLEMENTED: Will show plant/details.ejs for ${req.params.id}`);
};

// GET /edit/:id
exports.showEdit = (req, res) => {
  res.send(`NOT IMPLEMENTED: Will show plant/edit.ejs for ${req.params.id}`);
};

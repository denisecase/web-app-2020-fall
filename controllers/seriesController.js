/**
 *  series controller
 *  Handles requests related to seriess(see routes)
 *
 * @author Nithya Karepe <s540109@nwmissouri.edu>
 */

const db = require('../models/index');

// FUNCTIONS TO RESPOND WITH JSON DATA  ----------------------------------------

// GET all JSON
module.exports.findAll = (req, res) => {
  db.models.Series.findAll()
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
  db.models.Series.findByPk(id)
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
    await db.models.Series.create(req.body);
    return res.redirect('/series');
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// POST /save/:id
module.exports.saveEdit = async (req, res) => {
  try {
    const { reqId } = req.params.id;
    const [updated] = await db.models.Series.update(req.body, {
      where: { id: reqId },
    });
    if (updated) {
      return res.redirect('/series');
    }
    throw new Error(`${reqId} not found`);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

// POST /delete/:id
module.exports.deleteItem = async (req, res) => {
  try {
    const { reqId } = req.params.seriesId;
    const deleted = await db.models.Series.destroy({
      where: { id: reqId },
    });
    if (deleted) {
      return res.redirect('/series');
    }
    throw new Error(`${reqId} not found`);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

// RESPOND WITH VIEWS  --------------------------------------------

// GET to this controller base URI (the default)
module.exports.showIndex = (req, res) => {
  // res.send('NOT IMPLEMENTED: Will show series/index.ejs');
  res.render('series/index.ejs', { title: 'Seriess', req });
};

// GET /create
module.exports.showCreate = (req, res) => {
  res.send(`NOT IMPLEMENTED: Will show series/create.ejs for ${req.params.id}`);
};

// GET /delete/:id
module.exports.showDelete = (req, res) => {
  res.send(`NOT IMPLEMENTED: Will show series/delete.ejs for ${req.params.id}`);
};

// GET /details/:id
module.exports.showDetails = (req, res) => {
  res.send(
    `NOT IMPLEMENTED: Will show series/details.ejs for ${req.params.id}`,
  );
};

// GET /edit/:id
module.exports.showEdit = (req, res) => {
  res.send(`NOT IMPLEMENTED: Will show series/edit.ejs for ${req.params.id}`);
};

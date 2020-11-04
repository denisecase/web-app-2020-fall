/**
 *  animal controller
 *  Handles requests related to animal (see routes)
 *
 * @author Varsha Vellalnki <s540114@nwmissouri.edu>
 */

// import dependencies
const db = require('../models/index');

// FUNCTIONS TO RESPOND WITH JSON DATA  ----------------------------------------

// GET all JSON
exports.findAll = (req, res) => {
  db.models.Animal.findAll()
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
  db.models.Animal.findByPk(id)
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
    await db.models.Animal.create(req.body);
    return res.redirect('/animal');
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// POST /save/:id
exports.saveEdit = async (req, res) => {
  try {
    const { reqId } = req.params.id;
    const [updated] = await db.models.Animal.update(req.body, {
      where: { id: reqId },
    });
    if (updated) {
      return res.redirect('/animal');
    }
    throw new Error(`${reqId} not found`);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

// POST /delete/:id
exports.deleteItem = async (req, res) => {
  try {
    const { reqId } = req.params.animalId;
    const deleted = await db.models.Animal.destroy({
      where: { id: reqId },
    });
    if (deleted) {
      return res.redirect('/animal');
    }
    throw new Error(`${reqId} not found`);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

// RESPOND WITH VIEWS  --------------------------------------------

// GET to this controller base URI (the default)
exports.showIndex = (req, res) => {
  db.models.Animal.findAll()
    .then((data) => {
      res.locals.animals = data;
      // res.send('NOT IMPLEMENTED: Will show animal/index.ejs');
      res.render('animal/index.ejs', { title: 'Animals', req });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Error retrieving all.',
      });
    });
};

// GET /create
exports.showCreate = (req, res) => {
  res.render('animal/create.ejs', {
    title: 'Animals',
    res,
    name: '',
    lifeSpan: '',
    isPet: '',
  });
};

// GET /delete/:id
exports.showDelete = (req, res) => {
  const { id } = req.params;
  db.models.Animal.findByPk(id)
    .then((data) => {
      res.locals.animal = data;
      res.render('animal/delete.ejs', { title: 'Animals', res });
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error retrieving item with id=${id}: ${err.message}`,
      });
    });
};

// GET /details/:id
exports.showDetails = (req, res) => {
  const { id } = req.params;
  db.models.Animal.findByPk(id)
    .then((data) => {
      res.locals.animal = data;
      res.render('animal/details.ejs', { title: 'Animals', res });
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
  db.models.Animal.findByPk(id)
    .then((data) => {
      res.locals.animal = data;
      res.render('animal/details.ejs', { title: 'Animals', res });
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error retrieving item with id=${id}: ${err.message}`,
      });
    });
};

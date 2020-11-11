/**
 * Software Controller
 * Handles requests related to software (see routes)
 * @author Joseph Dobelmann <s536997@nwmissouri.edu>
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
  item.firstReleased = req.body.firstReleased;
  item.isOpenSource = req.body.isOpenSource;
  item.error = err.errors[0].message;
  LOG.info(`ERROR SAVING ITEM: ${JSON.stringify(item)}`);
  return item;
}


// GET all JSON
exports.findAll = async (req, res) => {
  (await db).models.Software.findAll()
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
  (await db).models.software.findByPk(id)
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
    const context = await db;
    await context.models.software.create(req.body);
    return res.redirect('/software');
  } catch (err) {
    if (err instanceof ValidationError) {
      const item = await prepareInvalidItem(err, req);
      res.locals.software = item;
      return res.render('software/create.ejs', {title: 'Software', res});
    }
    return res.redirect('/software');
  }
};

// POST /save/:id
exports.saveEdit = async (req, res) => {
  try {
    const reqId = parseInt(req.params.id, 10);
    const context = await db;
    const updated = await context.models.software.update(req.body, {
      where: {id: reqId},
    });
    LOG.info(`Updated: ${JSON.stringify(updated)}`);
    return res.redirect('/software');
  } catch (err) {
    if (err instanceof ValidationError) {
      const item = await prepareInvalidItem(err, req);
      res.locals.software = item;
      return res.redner('software/edit.ejs', {title: 'Software', res});
    }
    return res.redirect('/software');
  }
};

// POST /delete/:id
exports.deleteItem = async (req, res) => {
  try {
    const reqId = parseInt(req.params.id, 10);
    const deleted = (await db).models.Software.destroy({
      where: { id: reqId },
    });
    if (deleted) {
      return res.redirect('/software');
    }
    throw new Error(`${reqId} not found`);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

// RESPOND WITH VIEWS  --------------------------------------------

// GET to this controller base URI (the default)
exports.showIndex = async (req, res) => {
  // res.send('NOT IMPLEMENTED: Will show software/index.ejs');
  (await db).models.Software.findAll()
  .then((data) => {
    res.locals.software = data;
    res.render('software/index.ejs', { title: 'Software', res});
  })
  .catch((err) => {
    res.status(500).send({
      message: err.message || 'Error retrieving all.',
    });
  });
};

// GET /create
exports.showCreate = async (req, res) => {
  const tempItem = {
    name: 'SoftwareName',
    firstReleased: 1969,
    isOpenSource: true,
  };
  res.locals.software = tempItem;
  res.render('software/create.ejs', { title: 'Software', res});
};

// GET /delete/:id
exports.showDelete = async (req, res) => {
  const { id } = req.params;
  (await db).models.Software.findByPk(id)
  .then((data) => {
    res.locals.software = data;
    if (data) {
      res.render('software/delete.ejs', { title: 'Software', res});
    } else {
      res.redirect('software/');
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
  (await db).models.Software.findByPk(id)
  .then((data) => {
    res.locals.software = data;
    res.render('software/details.ejs', { title: 'Software', res });
  })
  .catch((err) => {
    res.status(500).send({
      message: `Error retrieving item with id=${id}: ${err.message}`,
    });
  })
};

// GET /edit/:id
exports.showEdit = async (req, res) => {
  const { id } = req.params;
  (await db).models.Software.findByPk(id)
  .then((data) => {
    res.locals.software = data;
    res.render('software/edit.ejs', { title: 'Software', res });
  })
  .catch((err) => {
    res.status(500).send({
      message: `Error retrieving item with id=${id}: ${err.message}`,
    });
  });
};

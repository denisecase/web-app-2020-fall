/**
 *  Competition controller
 *  Handles requests related to this resource (see routes)
 *
 * @author Denise Case <dcase@nwmissouri.edu>
 */
// const { ValidationError } = require('sequelize');
const LOG = require('../util/logger');
const db = require('../models/index')();

const tabTitle = 'Competitions';

// FUNCTIONS TO RESPOND WITH JSON DATA  ----------------------------------------

// GET all JSON
module.exports.findAll = async (req, res) => {
  (await db).models.Competition.findAll({
    attributes: {
      exclude: ['createdAt', 'updatedAt'],
    },
    include: [
      {
        model: (await db).models.User,
        attributes: ['id', 'email'], // creator
      },
      {
        model: (await db).models.Quest,
        attributes: ['id', 'name'],
      },
      {
        model: (await db).models.Team,
        attributes: ['id', 'name'],
      },
    ],
  })
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
  (await db).models.Competition.findByPk(id)
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
    await context.models.Competition.create(req.body);
    return res.redirect('/competition');
  } catch (err) {
    // if (err instanceof ValidationError) {
    //   const item = await prepareInvalidItem(err, req);
    //   res.locals.competition = item;
    //   return res.render('competition/create.ejs', { title: tabTitle, res });
    // }
    return res.redirect('/competition');
  }
};

// POST /save/:id
module.exports.saveEdit = async (req, res) => {
  try {
    const reqId = parseInt(req.params.id, 10);
    const context = await db;
    const updated = await context.models.Competition.update(req.body, {
      where: { id: reqId },
    });
    LOG.info(`Updated: ${JSON.stringify(updated)}`);
    return res.redirect('/competition');
  } catch (err) {
    // if (err instanceof ValidationError) {
    //   const item = await prepareInvalidItem(err, req);
    //   res.locals.competition = item;
    //   return res.render('competition/edit.ejs', { title: tabTitle, res });
    // }
    return res.redirect('/competition');
  }
};

// POST /delete/:id
module.exports.deleteItem = async (req, res) => {
  try {
    const reqId = parseInt(req.params.id, 10);
    const deleted = (await db).models.Competition.destroy({
      where: { id: reqId },
    });
    if (deleted) {
      return res.redirect('/competition');
    }
    throw new Error(`${reqId} not found`);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

// RESPOND WITH VIEWS  --------------------------------------------

// GET to this controller base URI (the default)
module.exports.showIndex = async (req, res) => {
  (await db).models.Competition.findAll({
    attributes: {
      exclude: ['createdAt', 'updatedAt'],
    },
    include: [
      {
        model: (await db).models.User,
        attributes: ['id', 'email'], // creator
      },
      {
        model: (await db).models.Quest,
        attributes: ['id', 'name'],
      },
      // {
      //   model: (await db).models.Team,
      //   attributes: ['id', 'name'],
      // },
    ],
  })
    .then((data) => {
      res.locals.competitions = data;
      res.render('competition/index.ejs', { title: tabTitle, res });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Error retrieving all.',
      });
    });
};

// GET /create
module.exports.showCreate = async (req, res) => {
  const allModels = (await db).models;
  // get all quests for the drop-down
  allModels.Quest.findAll({
    attributes: {
      exclude: ['createdAt', 'updatedAt'],
    },
  })
    .then((data) => {
      res.locals.quests = data;
      LOG.info(`quests=${JSON.stringify(res.locals.quests)}`);
      // build (not save) a default instance
      // and add it to the response.locals object
      const tempItem = allModels.Competition.build();
      tempItem.UserId = 1; // temp
      res.locals.competition = tempItem;
      LOG.info(`newCompetition=${JSON.stringify(res.locals.competition)}`);
      res.render('competition/create.ejs', { title: tabTitle, res });
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error creating new item: ${err.message}`,
      });
    });
};

// GET /delete/:id
module.exports.showDelete = async (req, res) => {
  const { id } = req.params;
  (await db).models.Competition.findByPk(id, {
    attributes: {
      exclude: ['createdAt', 'updatedAt'],
    },
    include: [
      {
        model: (await db).models.User,
        attributes: ['id', 'email'], // creator
      },
      {
        model: (await db).models.Quest,
        attributes: ['id', 'name'],
      },
      // {
      //   model: (await db).models.Team,
      //   attributes: ['id', 'name'],
      // },
    ],
  })
    .then((data) => {
      res.locals.competition = data;
      if (data) {
        res.render('competition/delete.ejs', { title: tabTitle, res });
      } else {
        res.redirect('competition/');
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
  (await db).models.Competition.findByPk(id, {
    attributes: {
      exclude: ['createdAt', 'updatedAt'],
    },
    include: [
      {
        model: (await db).models.User,
        attributes: ['id', 'email'], // creator
      },
      {
        model: (await db).models.Quest,
        attributes: ['id', 'name'],
      },
      // {
      //   model: (await db).models.Team,
      //   attributes: ['id', 'name'],
      // },
    ],
  })
    .then((data) => {
      res.locals.competition = data;
      res.render('competition/details.ejs', { title: tabTitle, res });
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error retrieving item with id=${id}: ${err.message}`,
      });
    });
};

// GET /edit/:id
module.exports.showEdit = async (req, res) => {
  // get all quests for the drop-down
  (await db).models.Quest.findAll().then((data) => {
    res.locals.quests = data;
  });

  // then, do the usual..........
  const { id } = req.params;
  (await db).models.Competition.findByPk(id, {
    attributes: {
      exclude: ['createdAt', 'updatedAt'],
    },
    include: [
      {
        model: (await db).models.User,
        attributes: ['id', 'email'], // creator
      },
      {
        model: (await db).models.Quest,
        attributes: ['id', 'name'],
      },
      // {
      //   model: (await db).models.Team,
      //   attributes: ['id', 'name'],
      // },
    ],
  })
    .then((data) => {
      res.locals.competition = data;
      res.render('competition/edit.ejs', { title: tabTitle, res });
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error retrieving item with id=${id}: ${err.message}`,
      });
    });
};

// GET /play/:id
module.exports.showPlay = async (req, res) => {
  const { id } = req.params;
  (await db).models.Competition.findByPk(id, {
    attributes: {
      exclude: ['createdAt', 'updatedAt'],
    },
    include: [
      {
        model: (await db).models.User,
        attributes: ['id', 'email'], // creator
      },
      {
        model: (await db).models.Quest,
        attributes: ['id', 'name'],
      },
      // {
      //   model: (await db).models.Team,
      //   attributes: ['id', 'name'],
      // },
    ],
  })
    .then((data) => {
      res.locals.competition = data;
      if (data) {
        res.render('competition/play.ejs', { title: tabTitle, res });
      } else {
        res.redirect('competition/');
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error retrieving item with id=${id}: ${err.message}`,
      });
    });
};

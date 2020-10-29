/**
 * Software Controller
 * Handles requests related to software (see routes)
 * @author Joseph Dobelmann <s536997@nwmissouri.edu>
 */

// import dependencies
const express = require('express');

const db = require('../models/index');

// GET all JSON
exports.findAll = (req, res) => {
  db.models.software
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
  db.models.software
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
    await db.models.software.create(req.body);
    return res.redirect('/software');
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// POST /save/:id
exports.saveEdit = async (req, res) => {
  try {
    const { reqId } = req.params.id;
    const [updated] = await db.models.software.update(req.body, {
      where: { id: reqId },
    });
    if (updated) {
      return res.redirect('/software');
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
    const deleted = await db.models.software.destroy({
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
exports.showIndex = (req, res) => {
  // res.send('NOT IMPLEMENTED: Will show software/index.ejs');
  res.render('software/index.ejs', { title: 'software', req });
};

// GET /create
exports.showCreate = (req, res) => {
  res.send(`NOT IMPLEMENTED: Will show software/create.ejs for ${req.params.id}`);
};

// GET /delete/:id
exports.showDelete = (req, res) => {
  res.send(`NOT IMPLEMENTED: Will show software/delete.ejs for ${req.params.id}`);
};

// GET /details/:id
exports.showDetails = (req, res) => {
  res.send(`NOT IMPLEMENTED: Will show software/details.ejs for ${req.params.id}`);
};

// GET /edit/:id
exports.showEdit = (req, res) => {
  res.send(`NOT IMPLEMENTED: Will show software/edit.ejs for ${req.params.id}`);
};
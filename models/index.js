/**
 *  Model index.js
 *
 */

const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];

const db = new Sequelize(config);

// Dr. Case - rabbit
require('./rabbit')(db, Sequelize.DataTypes);

// Dr. Hoot - tea

// Blake - game

// Varsha - animal

// Felipe - ?

// Jack - chief

// Sreenidhi - student

// Sri Vasavi - food

// Joseph - software

// Stephen - whiskey

// Shivani - book

// Kunal - videoGame

// Chandler - company

// Praneeth - course

// Nithya - series

// Zach - fruit
require('./fruit')(db, Sequelize.DataTypes);

// Prashansa - dance

module.exports = db;

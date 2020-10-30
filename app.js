/**
 *  The main program for our web app.
 *
 * @author Denise Case <dcase@nwmissouri.edu>
 */

// import default dependencies
const createError = require('http-errors');
const express = require('express');
const path = require('path'); // builds path strings
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// import additional dependencies
const engines = require('consolidate');
const expressLayouts = require('express-ejs-layouts');
const helmet = require('helmet'); // safer http headers
global.passport = require('passport');
const compression = require('compression'); // smaller=faster

// app variables
const isProduction = process.env.NODE_ENV === 'production';
console.info('Environment isProduction = ', isProduction);

// create an Express app
const app = express();
console.log('app created');

// view engine(s) setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('ejs', engines.ejs);

// set up other middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(helmet());
app.use(expressLayouts);
app.use(compression()); // compress all routes

// set up user authentication (logging in & admin)
app.use(global.passport.initialize());
app.use(global.passport.session());

console.log('app initial middleware configured');

// route most requests to the indexRouter
// route requests that start with /users to the usersRouter
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

console.log('app default routes configured');

// Dr. Case - rabbit
try {
  app.use('/rabbit', require('./routes/rabbit.routes'));
} catch (err) {
  console.error(`ERROR: ${err.message}`);
}

// Dr. Hoot - tea

// Blake - game
try {
  app.use('/game', require('./routes/game.routes'));
} catch (err) {
  console.error(`ERROR: ${err.message}`);
}

// Varsha - animal
app.use('/animal', require('./routes/animal.routes'));

// Felipe - ?

// Jack - chief

// Sreenidhi - plant
app.use('/plant', require('./routes/plant.routes'));

// Sri Vasavi - food
app.use('/food', require('./routes/food.routes'));
// Joseph - software
app.use('/software', require('./routes/software.routes'));
// Stephen - whiskey
try {
  app.use('/whiskey', require('./routes/whiskey.routes'));
} catch (err) {
  console.error(`ERROR: ${err.message}`);
}

// Shivani - book
app.use('/book', require('./routes/book.routes'));

// Kunal - videoGame
try {
  app.use('/videogame', require('./routes/videogame.routes'));
} catch (err) {
  console.error(`ERROR: ${err.message}`);
}
// Chandler - company
app.use('/company', require('./routes/company.routes'));

// Praneeth - cricket
app.use('/cricket', require('./routes/cricket.routes'));
// Nithya - series
app.use('/series', require('./routes/series.routes'));

// Zach - fruit

// Prashansa - dance
try {
  app.use('/dance', require('./routes/dance.routes'));
} catch (err) {
  console.error(`ERROR: ${err.message}`);
}

// Sam - ship

// Lindsey - pokemon

console.log('app custom routes configured');

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler from
// https://github.com/mdn/express-locallibrary-tutorial/blob/master/app.js
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// export the express app (helpful for testing)
module.exports = app;

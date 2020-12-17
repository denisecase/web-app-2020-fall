/**
 *  Competition model
 *  Describes each attribute in this type of resource.
 *
 * @author Denise Case  <dcase@nwmissouri.edu>
 *
 * *
 * For more information about defining sequelize models, see
 * https://sequelize.org/v5/manual/data-types.html
 *
 */
// Export a function that defines the model.
// It automatically receives the Sequelize connection parameter.

const moment = require('moment');

module.exports = (db, DataTypes) => {
  db.define(
    'Competition',
    {
      // sqlite creates an id attribute automatically
      name: {
        type: DataTypes.STRING(50),
        unique: true,
        required: true,
        allowNull: false,
        defaultValue: 'NewCompetitionName',
        // use Express Validator options
        // see: https://github.com/validatorjs/validator.js#validators
        validate: {
          is: {
            // use a Regular Expression (regex)
            // ^starts & ends$ with a letter
            // no consecutive spaces
            // TODO: Find more efficient approach
            args: /^([a-zA-Z]+\s)*[a-zA-Z]+$/i,
            msg:
              'Name is only letters and single spaces, no numbers or punctuation.',
          },
          notNull: {
            args: true,
            msg: 'Name cannot be null.',
          },
          notEmpty: {
            args: true, // RegExp- only letters, no spaces
            msg: 'Name cannot be empty.',
          },
          max: {
            args: [50],
            msg: 'Name is limited to 50 characters.',
          },
          min: {
            args: [3],
            msg: 'Name must be at least 3 characters.',
          },
        },
      },
      startDateTime: {
        type: DataTypes.STRING(50),
        defaultValue: new Date(),
        // sequelize uses default DATETIME format
        // Fri Dec 04 2020 09:00:00 GMT-0600 (GMT-06:00)
        // HTML datetime-local requires format yyyy-mm-ddThh:mm
        // TODO: may still have challenges on mobile devices
        get() {
          const d = this.getDataValue('startDateTime');
          return moment(d).format('YYYY-MM-DDThh:mm');
        },
      },
      endDateTime: {
        type: DataTypes.STRING(50),
        defaultValue: new Date(),
        get() {
          const d = this.getDataValue('endDateTime');
          return moment(d).format('YYYY-MM-DDThh:mm');
        },
      },
      // Equator is 0, Latitude is -90 to +90 degrees
      // As a decimal value (North/South)
      startLatitude: {
        type: DataTypes.DECIMAL,
        required: true,
        defaultValue: 40.3506,
        validate: {
          max: {
            args: 90,
            msg: 'Latitude must be 90 degrees or less.',
          },
          min: {
            args: -90,
            msg: 'Latitude must be -90 degrees or more.',
          },
        },
      },
      // Greenwich England is 0, range 0 to +/-180 degrees
      // As a decimal value (East/West)
      startLongitude: {
        type: DataTypes.DECIMAL,
        required: true,
        defaultValue: -94.88289,
        validate: {
          max: {
            args: 180,
            msg: 'Latitude must be 180 degrees or less.',
          },
          min: {
            args: -180,
            msg: 'Latitude must be -180 degrees or more.',
          },
        },
      },
      startDescription: {
        type: DataTypes.STRING(200),
        unique: false,
        required: true,
        allowNull: false,
        defaultValue: 'StartDescription',
        // use Express Validator options
        // see: https://github.com/validatorjs/validator.js#validators
        validate: {
          is: {
            // use a Regular Expression (regex)
            // ^starts & ends$ with a letter
            // no consecutive spaces
            // TODO: Find more efficient approach
            args: /^([a-zA-Z]+\s)*[a-zA-Z]+$/i,
            msg:
              'Start description is only letters and single spaces, no numbers or punctuation.',
          },
          max: {
            args: [200],
            msg: 'Start description is limited to 200 characters.',
          },
          min: {
            args: [3],
            msg: 'Start description must be at least 3 characters.',
          },
        },
      },
    },
    {
      // Other model options go here
    }
  );
};

/**
 *  Team model
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

module.exports = (db, DataTypes) => {
  db.define(
    'Team',
    {
      // sqlite creates an id attribute automatically
      name: {
        type: DataTypes.STRING(50),
        unique: true,
        required: true,
        allowNull: false,
        defaultValue: 'TeamName',
        // use Express Validator options
        // see: https://github.com/validatorjs/validator.js#validators
        validate: {
          is: {
            // use a Regular Expression (regex)
            // ^starts & ends$ with a letter
            // no consecutive spaces
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
    },
    {
      // Other model options go here
    }
  );
};

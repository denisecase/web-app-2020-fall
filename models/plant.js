/**
 *  Plant model
 *  Describes the characteristics of each attribute in a plant resource.
 *
 * @author Sreenidhi Madala <s541226@nwmissouri.edu>
 *
 * * For more information about defining sequelize models, see
 * https://sequelize.org/v5/manual/data-types.html
 * https://sequelize.org/master/manual/validations-and-constraints.html
 *
 * For validators see: https://github.com/validatorjs/validator.js
 *
 */
// Export a function that defines the model.
// It automatically receives the Sequelize connection parameter.

module.exports = (db, DataTypes) => {
  db.define('Plant', {
    // sqlite creates a rowid attribute automatically
    name: {
      type: DataTypes.STRING(30),
      unique: true,
      required: true,
      allowNull: false,
      defaultValue: 'Plant',
      validate: {
        is: {
          args: /^[A-Za-z]+$/i, // matches a RegExp
          msg: 'Name is only letters, no spaces or punctuation.',
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
          args: [30],
          msg: 'Name is limited to 32 characters.',
        },
        min: {
          args: [3],
          msg: 'Name must be at least 3 characters.',
        },
      },
    },
    variety: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      required: true,
      validate: {
        max: {
          args: 100,
          msg: 'varieties must be 100 or less.',
        },
        min: {
          args: 1,
          msg: 'varieties must be 1 or more.',
        },
      },
    },
    isPlant: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });
};

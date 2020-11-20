/**
 *  User model
 *  Describes the characteristics of each attribute in a user resource.
 *
 * @author Denise Case <dcase@nwmissouri.edu>
 *
For more information about defining sequelize models, see
 * https://sequelize.org/v5/manual/data-types.html
 * https://sequelize.org/master/manual/validations-and-constraints.html
 *
 * For validators see: https://github.com/validatorjs/validator.js
 *
 */
// Export a function that defines the model.
// It automatically receives the Sequelize connection parameter.

module.exports = (db, DataTypes) => {
  db.define(
    'User',
    {
      email: {
        type: DataTypes.STRING(100),
        unique: true,
        required: true,
        allowNull: false,
        defaultValue: 'me@nwmissouri.edu',
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING(25),
        required: true,
        allowNull: false,
      },
      last_login: DataTypes.DATE,
    },
    {
      // Other model options go here
    }
  );
};

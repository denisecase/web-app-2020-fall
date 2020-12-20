/**
 *  User model
 *  Describes the characteristics of each attribute in a user resource.
 *
 * @author Denise Case <dcase@nwmissouri.edu>
 *
 * For more information about defining sequelize models, see
 * https://sequelize.org/v5/manual/data-types.html
 * https://sequelize.org/master/manual/validations-and-constraints.html
 *
 * For validators see: https://github.com/validatorjs/validator.js
 *
 * Also: https://medium.com/@benjaminpwagner/
 * using-sequelize-hooks-and-crypto-to-encrypt-user-passwords-5cf1a27513d9
 *
 */
// Export a function that defines the model.
// It automatically receives the Sequelize connection parameter.

const md5 = require('md5');

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
        // use Express Validator options
        // see: https://github.com/validatorjs/validator.js#validators
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false,
        set(value) {
          this.setDataValue('password', md5(value));
        },
      },
      last_login: DataTypes.DATE,
    },
    {
      // Other model options go here
    }
  );
};

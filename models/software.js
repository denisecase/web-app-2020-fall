/**
 * Software model
 * Describes each attribute in a software resource
 * @author Joseph Dobelmann <s536997@nwmissouri.edu>
 *
 * For more information about defining sequelize models, see
 * https://sequelize.org/v5/manual/data-types.html
 *
 */
// Export a function that defines the model.
// It automatically receives the Sequelize connection parameter.

module.exports = (db, DataTypes) => {
  db.define('Software', {
    // sqlite creates a rowid attribute automatically
    name: {
      type: DataTypes.STRING(30),
      unique: true,
      required: true,
      allowNull: false,
      defaultValue: 'Software',
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
    firstReleased: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      required: true,
      validate: {
        max: {
          args: 2021,
          msg: 'Year of initial release cannot be newer than 2021.',
        },
        min: {
          args: 1969,
          msg: 'Year of initial release cannot be older than 1969.',
        },
      },
    },
    isOpenSource: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });
};
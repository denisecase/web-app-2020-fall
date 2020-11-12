/**
 *  Ship model
 *  Describes the characteristics of each attribute in a ship resource.
 *
 * @author Sam Ritter <s523855@nwmissouri.edu>
 * For more information about defining sequelize models, see
 * https://sequelize.org/v5/manual/data-types.html
 *
 */
// Export a function that defines the model.
// It automatically receives the Sequelize connection parameter.

module.exports = (db, DataTypes) => {
  db.define('Ship', {
    // sqlite creates a rowid attribute automatically
    name: {
      type: DataTypes.STRING(30),
      unique: true,
      required: true,
      allowNull: false,
      defaultValue: 'Ship',
      validate: {
        is: {
          args: /^[A-Za-z ]+$/i, // matches a RegExp
          msg: 'Name is only letters and spaces, no punctuation.',
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
    guns: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      required: true,
      validate: {
        max: {
          args: 140,
          msg: 'Gun count must be 140 or less.',
        },
        min: {
          args: 0,
          msg: 'Gun count must be 0 or more.',
        },
      },
    },
    isFictional: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });
};

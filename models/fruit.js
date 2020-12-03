/**
 *  Fruit model
 *  Describes the characteristics of each attribute in a fruit resource.
 *
 * @author Zach Watson <s531994@nwmissouri.edu>
 */

module.exports = (db, DataTypes) => {
  db.define('Fruit', {
    // sqlite creates a rowid attribute automatically
    name: {
      type: DataTypes.STRING(30),
      unique: true,
      required: true,
      allowNull: false,
      defaultValue: 'Fruit',
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
    daysGrowth: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      required: true,
      validate: {
        max: {
          args: 1000,
          msg: 'Days Growth must be 1000 or less.',
        },
        min: {
          args: 1,
          msg: 'Days Growth must be 1 or more.',
        },
      },
    },
    isRipe: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });
};

/**
 *  Tea model
 *  Describes the characteristics of each attribute in a tea resource.
 *
 * @author Charles Hoot <hoot@nwmissouri.edu>
 */

module.exports = (db, DataTypes) => {
  db.define('Tea', {
    // sqlite creates a rowid attribute automatically
    name: {
      type: DataTypes.STRING(30),
      unique: true,
      required: true,
      allowNull: false,
      defaultValue: 'GoodStuff',
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
          msg: 'Name is limited to 30 characters.',
        },
        min: {
          args: [3],
          msg: 'Name must be at least 3 characters.',
        },
      },
    },
    pricePerGram: {
      type: DataTypes.DOUBLE,
      defaultValue: 2.3,
      required: true,
      validate: {
        max: {
          args: 100.0,
          msg: 'Price per gram must be 100.0 or less',
        },
        min: {
          args: 0.01,
          msg: 'Price per gram must be 0.01 or more',
        },
      },
    },
    isPuer: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });
};

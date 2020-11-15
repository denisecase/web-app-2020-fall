/**
 *  Cricket model
 *  Describes the characteristics of each attribute in a plant resource.
 *
 * @author Praneeth Vallabhaneni <S541312@nwmissouri.edu>
 */

module.exports = (db, DataTypes) => {
  db.define('cricket', {
    // sqlite creates a rowid attribute automatically
    name: {
      type: DataTypes.STRING(30),
      unique: true,
      required: true,
      allowNull: false,
      defaultValue: 'cricket',
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
    age: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      required: true,
      validate: {
        max: {
          args: 100,
          msg: 'Age must be 100 or less.',
        },
        min: {
          args: 1,
          msg: 'Age must be 1 or more.',
        },
      },
    },
    isCricket: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });
};

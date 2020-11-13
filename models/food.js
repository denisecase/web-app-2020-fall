/**
 *  food model
 *  Describes the characteristics of each attribute in a food resource.
 *
 * @author Sri Vasavi Vipparla <s540791@nwmissouri.edu>
 *
 *
 * For more information about defining sequelize models, see
 * https://sequelize.org/v5/manual/data-types.html
 *
 */
// Export a function that defines the model.
// It automatically receives the Sequelize connection parameter.

module.exports = (db, DataTypes) => {
  db.define('food', {
    // sqlite creates a rowid attribute automatically
    name: {
      type: DataTypes.STRING(30),
      unique: true,
      required: true,
      allowNull: false,
      defaultValue: 'food',
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
    pricePerLB: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      required: true,
      validate: {
        max: {
          args: 100,
          msg: 'pricePerLB must be 100 or less.',
        },
        min: {
          args: 1,
          msg: 'pricePerLB must be 1 or more.',
        },
      },
    },
    isMeat: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });
};

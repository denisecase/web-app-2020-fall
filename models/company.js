/**
 *  company model
 *  Describes the characteristics of each attribute in a company resource.
 *
 * @author Chandler  Wright <s534776@nwmissouri.edu>
 *
 * For more information about defining sequelize models, see
 * https://sequelize.org/v5/manual/data-types.html
 *
 */
// Export a function that defines the model.
// It automatically receives the Sequelize connection parameter.

module.exports = (db, DataTypes) => {
  db.define('Company', {
    // sqlite creates a rowid attribute automatically
    name: {
      type: DataTypes.STRING(30),
      unique: true,
      required: true,
      allowNull: false,
      defaultValue: 'Company',
      validate: {
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
          args: [1],
          msg: 'Name must be at least 1 characters.',
        },
      },
    },
    founded: {
      type: DataTypes.INTEGER,
      defaultValue: 2020,
      required: true,
      validate: {
        max: {
          args: 2020,
          msg: 'Founded date must be this year or earlier',
        },
        min: {
          args: 1,
          msg: 'Founded date be 1 or more.',
        },
      },
    },
    isPublic: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });
};

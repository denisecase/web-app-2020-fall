/**
 *  video-games model
 *  Describes the characteristics of each attribute in a animal resource.
 *
 * @author kunal vohra <s540786@nwmissouri.edu>

 * For more information about defining sequelize models, see
 * https://sequelize.org/v5/manual/data-types.html
 *
 */
// Export a function that defines the model.
// It automatically receives the Sequelize connection parameter.

module.exports = (db, DataTypes) => {
  db.define('videogame', {
    // sqlite creates a rowid attribute automatically
    name: {
      type: DataTypes.STRING(70),
      unique: true,
      require: true,
      allowNull: false,
      defaultValue: 'videogameName',
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
          args: [70],
          msg: 'Name is limited to 70 characters.',
        },
        min: {
          args: [3],
          msg: 'Name must be at least 3 characters.',
        },
      },
    },
    playersNeeded: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      required: true,
      validate: {
        max: {
          args: 100,
          msg: 'Players must be 100 or less.',
        },
        min: {
          args: 1,
          msg: 'Players must be 1 or more.',
        },
      },
    },
    isReleased: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });
};

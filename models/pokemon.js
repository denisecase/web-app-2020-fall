/**
 *  Pokemon model
 *  Describes the characteristics of each attribute in the Pokemon resource.
 *
 * @author Lindsey Fares <s524219@nwmissouri.edu>
 *
 */
// Export a function that defines the model.
// It automatically receives the Sequelize connection parameter.

module.exports = (db, DataTypes) => {
    db.define('Pokemon', {
      // sqlite creates a rowid attribute automatically
      name: {
        type: DataTypes.STRING(30),
        unique: true,
        required: true,
        allowNull: false,
        defaultValue: 'Pokemon',
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
            args: [3],
            msg: 'Name must be at least 3 characters.',
          },
        },
      },
      generation: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        required: true,
        validate: {
          max: {
            args: 8,
            msg: 'Generation can not be greater than 8',
          },
          min: {
            args: 1,
            msg: 'Generation must be one or greater',
          },
        },
      },
      isStarter: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    });
  };  
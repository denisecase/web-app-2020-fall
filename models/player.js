/**
 *  Player model
 *  Describes each attribute in this type of resource.
 *
 * @author Denise Case  <dcase@nwmissouri.edu>
 *
 *
 */
// Export a function that defines the model.
// It receives the Sequelize connection parameter.

module.exports = (db, DataTypes) => {
  db.define(
    'Player',
    {
      // sqlite creates an id attribute automatically
      name: {
        type: DataTypes.STRING(50),
      },
    },
    {
      // Other model options go here
    }
  );
};


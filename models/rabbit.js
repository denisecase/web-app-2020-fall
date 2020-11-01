/**
 *  Rabbit model
 *  Describes the characteristics of each attribute in a rabbit resource.
 *
 * @author Denise Case <dcase@nwmissouri.edu>
 *
 * For more information about defining sequelize models, see
 * https://sequelize.org/v5/manual/data-types.html
 *
 */
// Export a function that defines the model.
// It automatically receives the Sequelize connection parameter.

module.exports = (db, DataTypes) => {
  db.define('Rabbit', {
    // sqlite creates a rowid attribute automatically
    name: { type: DataTypes.STRING(30) },
    age: { type: DataTypes.INTEGER },
    isCartoon: { type: DataTypes.BOOLEAN },
  });
};

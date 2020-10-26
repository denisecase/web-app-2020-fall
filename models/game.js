/**
 *  Rabbit model
 *  Describes the characteristics of each attribute in a rabbit resource.
 *
 * @author Blake Bennett <s532542@nwmissouri.edu>
 *
 * For more information about defining sequelize models, see
 * https://sequelize.org/v5/manual/data-types.html
 *
 */
// Export a function that defines the model.
// It automatically receives the Sequelize connection parameter.

module.exports = (sequelize, DataTypes) => {
  sequelize.define('Game', {
    // sqlite creates a rowid attribute automatically
    name: { type: DataTypes.STRING(30) },
    playerCount: { type: DataTypes.INTEGER },
    isCardGame: { type: DataTypes.BOOLEAN },
  });
};

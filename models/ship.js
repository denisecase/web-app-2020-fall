/**
 *  Ship model
 *  Describes the characteristics of each attribute in a ship resource.
 *
 * @author Sam Ritter <s523855@nwmissouri.edu>
 */
// Export a function that defines the model.
// It automatically receives the Sequelize connection parameter.

module.exports = (sequelize, DataTypes) => {
  sequelize.define('Ship', {
    // sqlite creates a rowid attribute automatically
    name: { type: DataTypes.STRING(30) },
    guns: { type: DataTypes.INTEGER },
    isFictional: { type: DataTypes.BOOLEAN },
  });
};

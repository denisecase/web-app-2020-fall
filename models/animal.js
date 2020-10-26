/**
 *  animal model
 *  Describes the characteristics of each attribute in a animal resource.
 *
 * @author varsha  vellanki <s540114@nwmissouri.edu>
 *
 * For more information about defining sequelize models, see
 * https://sequelize.org/v5/manual/data-types.html
 *
 */
// Export a function that defines the model.
// It automatically receives the Sequelize connection parameter.

module.exports = (sequelize, DataTypes) => {
  sequelize.define('Animal', {
    // sqlite creates a rowid attribute automatically
    name: { type: DataTypes.STRING(30) },
    lifeSpan: { type: DataTypes.INTEGER },
    isPet: { type: DataTypes.BOOLEAN },
  });
};

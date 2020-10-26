/**
 *  Food model
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

module.exports = (sequelize, DataTypes) => {
  sequelize.define('Food', {
    // sqlite creates a rowid attribute automatically
    name: { type: DataTypes.STRING(30) },
    pricePerLB: { type: DataTypes.INTEGER },
    isMeat: { type: DataTypes.BOOLEAN },
  });
};

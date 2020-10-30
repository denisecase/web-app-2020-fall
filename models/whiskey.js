/**
 *  Whiskey model
 *  Describes the characteristics of each attribute in a whiskey resource.
 *
 * @author Stephen Burke <burke.stephenpaul@gmail.com>
 * * For more information about defining sequelize models, see
 * https://sequelize.org/v5/manual/data-types.html
 *
 */
// Export a function that defines the model.
// It automatically receives the Sequelize connection parameter.

module.exports = (sequelize, DataTypes) => {
  sequelize.define('Whiskey', {
    // sqlite creates a rowid attribute automatically
    name: { type: DataTypes.STRING(30) },
    age: { type: DataTypes.INTEGER },
    isScotch: { type: DataTypes.BOOLEAN },
  });
};

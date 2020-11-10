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

module.exports = (sequelize, DataTypes) => {
  sequelize.define('videogame', {
    // sqlite creates a rowid attribute automatically
    name: { type: DataTypes.STRING(45) },
    playersNeeded: { type: DataTypes.INTEGER },
    isReleased: { type: DataTypes.BOOLEAN },
  });
};

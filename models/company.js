/**
 *  company model
 *  Describes the characteristics of each attribute in a company resource.
 *
 * @author Chandler  Wright <s534776@nwmissouri.edu>
 *
 * For more information about defining sequelize models, see
 * https://sequelize.org/v5/manual/data-types.html
 *
 */
// Export a function that defines the model.
// It automatically receives the Sequelize connection parameter.

module.exports = (sequelize, DataTypes) => {
    sequelize.define('Company', {
      // sqlite creates a rowid attribute automatically
      name: { type: DataTypes.STRING(30) },
      founded: { type: DataTypes.INTEGER },
      isPublic: { type: DataTypes.BOOLEAN },
    });
  };
  
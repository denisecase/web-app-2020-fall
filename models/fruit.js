/**
 *  Fruit model
 *  Describes the characteristics of each attribute in a fruit resource.
 *
 * @author Zach Watson <s531994@nwmissouri.edu>
 */

module.exports = (sequelize, DataTypes) => {
  sequelize.define('Fruit', {
    // sqlite creates a rowid attribute automatically
    name: { type: DataTypes.STRING(30) },
    daysGrowth: { type: DataTypes.INTEGER },
    isRipe: { type: DataTypes.BOOLEAN },
  });
};

/**
 *  Tea model
 *  Describes the characteristics of each attribute in a tea resource.
 *
 * @author Charles Hoot <hoot@nwmissouri.edu>
 */

module.exports = (sequelize, DataTypes) => {
  sequelize.define('Tea', {
    // sqlite creates a rowid attribute automatically
    name: { type: DataTypes.STRING(30) },
    pricePerGram: { type: DataTypes.DOUBLE },
    isPuer: { type: DataTypes.BOOLEAN },
  });
};

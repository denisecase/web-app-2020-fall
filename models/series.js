/**
 *  series model
 *  Describes the characteristics of each attribute in a series resource.
 *
 * @author Nithya Karepe<s540109@nwmissouri.edu>
 */
module.exports = (sequelize, DataTypes) => {
  sequelize.define('Series', {
    // sqlite creates a rowid attribute automatically
    name: { type: DataTypes.STRING(30) },
    seasons: { type: DataTypes.INTEGER },
    isComedy: { type: DataTypes.BOOLEAN },
  });
};

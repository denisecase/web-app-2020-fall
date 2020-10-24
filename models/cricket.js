/**
 *  Cricket model
 *  Describes the characteristics of each attribute in a plant resource.
 *
 * @author Praneeth Vallabhaneni <S541312@nwmissouri.edu>
 */
module.exports = (sequelize, DataTypes) => {
  sequelize.define('Cricket', {
    // sqlite creates a rowid attribute automatically
    teamName: { type: DataTypes.STRING(30) },
    captain: { type: DataTypes.STRING(30) },
    age: { type: DataTypes.INTEGER },
  });
};

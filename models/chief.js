/**
 *  Chiefs model
 *  Describes each attribute in a Chiefs resource.
 *
 * @author Jack W Beaver <s5269374@nwmissouri.edu>
 *
 * For more information about defining sequelize models, see
 * https://sequelize.org/v5/manual/data-types.html
 *
 */
// Export a function that defines the model.
// It automatically receives the Sequelize connection parameter.

module.exports = (sequelize, DataTypes) => {
  sequelize.define('chief', {
    // sqlite creates a rowid attribute automatically
    player: { type: DataTypes.STRING(30) },
    teamSince: { type: DataTypes.INTEGER },
    isSuperBowlChamp: { type: DataTypes.BOOLEAN },
  });
};
/** 1. player= "patrickmahomes", teamSince= 2017, isSuperBowlChamp= True
  
  2.player= "traviskelce", teamSince =2013, isSuperBowlChamp = True
  
  3.player="priestholmes" , teamSince =2001, isSuperBowlChamp= False  */

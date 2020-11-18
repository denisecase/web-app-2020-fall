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

  module.exports = (db, DataTypes) => {
    db.define('Chief', {
      // sqlite creates a rowid attribute automatically
      name: {
        type: DataTypes.STRING(30),
        unique: true,
        required: true,
        allowNull: false,
        defaultValue: 'Chief',
        validate: {
          is: {
            args: /^[A-Za-z]+$/i, // matches a RegExp
            msg: 'Player is only letters, no spaces or punctuation.',
          },
          notNull: {
            args: true,
            msg: 'Player cannot be null.',
          },
          notEmpty: {
            args: true, // RegExp- only letters, no spaces
            msg: 'Player cannot be empty.',
          },
          max: {
            args: [30],
            msg: 'Player is limited to 30 characters.',
          },
          min: {
            args: [3],
            msg: 'Player must be at least 3 characters.',
          },
        },
      },
      firstReleased: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        required: true,
        validate: {
          max: {
            args: 2021,
            msg: 'Player has not been on team since year has not happened yet.',
          },
          min: {
            args: 1970,
            msg: 'Player has not been on team since before 1970.',
          },
        },
      },
      isOpenSource: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    });
  };
  

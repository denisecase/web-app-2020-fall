/**
 *  Competition model
 *  Describes each attribute in this type of resource.
 *
 * @author Denise Case  <dcase@nwmissouri.edu>
 *
 * *
 * For more information about defining sequelize models, see
 * https://sequelize.org/v5/manual/data-types.html
 *
 */
// Export a function that defines the model.
// It automatically receives the Sequelize connection parameter.

module.exports = (db, DataTypes) => {
  db.define('Competition', {
    // sqlite creates a rowid attribute automatically
    name: {
      type: DataTypes.STRING(50),
      defaultValue: 'NewCompetitionName'
    },
    creatorUserId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Users",
        foreignKey: "id"
      },
      defaultValue: 3,
    },
    questId: {
      type: DataTypes.INTEGER,
      references: {
          model: "Quests",
          foreignKey: "id"
      }, 
      defaultValue : 1,
    },
    startDateTime: {
      type: DataTypes.DATE,
      defaultValue: new Date(),
    },
     endDateTime: {
      type: DataTypes.DATE,
      defaultValue: new Date(),
    },
  },
  {
    // Other model options go here
    freezeTableName: true, // table name will be model name - no plurals
  }
  );
};

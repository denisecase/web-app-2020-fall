/**
 *  Clue model
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
  db.define(
    'Clue',
    {
      // sqlite creates a rowid attribute automatically
      name: {
        type: DataTypes.STRING(50),
      },
    },
    {
      // Other model options go here
      freezeTableName: true, // table name will be model name - no plurals
    }
  );
};

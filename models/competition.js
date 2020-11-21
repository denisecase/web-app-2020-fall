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
  db.define(
    'Competition',
    {
      // sqlite creates an id attribute automatically
      name: {
        type: DataTypes.STRING(50),
        defaultValue: 'NewCompetitionName',
      },
      startDateTime: {
        type: DataTypes.DATE,
        defaultValue: new Date(),
      },
      endDateTime: {
        type: DataTypes.DATE,
        defaultValue: new Date(),
      },
      startLatitude: {
        type: DataTypes.DECIMAL,
        defaultValue: 40.3506,
      },
      startLongitude: {
        type: DataTypes.DECIMAL,
        defaultValue: -94.88289,
      },
      startDescription: {
        type: DataTypes.STRING,
        defaultValue: 'Describe Start Location',
      },
    },
    {
      // Other model options go here
    }
  );
};

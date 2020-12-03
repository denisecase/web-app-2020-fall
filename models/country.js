/**
 *  Country model
 *  Describes the characteristics of each attribute in a country resource.
 *
 * @author Felipe Sato  <s531355@nwmissouri.edu>
 */

// Export a function that defines the model.
// It automatically receives the Sequelize connection parameter.

module.exports = (sequelize, DataTypes) => {
  sequelize.define('Country', {
    name: { type: DataTypes.STRING(50)},
    population: { type: DataTypes.INTEGER },
    isPopulationMoreThan100M: { type: DataTypes.BOOLEAN },
  });
};

/**
  name = USA, continent = North America, Pupulation 328 (in million)
  name = Canada  continent = North America, Pupulation 30
  name = Mexico  continent = North America, Pupulation 128
   */

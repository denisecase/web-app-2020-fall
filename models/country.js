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
      continent: { type: DataTypes.STRING(20) },
      population: { type: DataTypes.INTEGER},
    });
  };

  /**
  name = USA, continent = North America, Pupulation 328 (in million)
  name = Canada  continent = North America, Pupulation 30
  name = Mexico  continent = North America, Pupulation 128
   */
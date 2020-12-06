/**
 *  dance model
 *  Describes each attribute in a dance resource.
 *
 * @author Sai Prashansa Ambarkar  <s541063@nwmissouri.edu>
 *
 * *
 * For more information about defining sequelize models, see
 * https://sequelize.org/v5/manual/data-types.html
 *
 */
// Export a function that defines the model.
// It automatically receives the Sequelize connection parameter.

module.exports = (db, DataTypes) => {
  db.define('Dance', {
    // sqlite creates a rowid attribute automatically
    form: { type: DataTypes.STRING(300) },
    yearInfo: { type: DataTypes.INTEGER },
    isTraditional: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });
};

// form= "Kuchipudi",    yearIntro= 1502 ,  isTraditional = True
// 2. form = "Bollywood ",   yearIntro =  1960, isTraditional = False
// 3. form = "Bhagra",  yearIntro =1940, isTraditional = True

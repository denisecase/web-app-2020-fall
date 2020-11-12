/**
 *  book model
 *  Describes the characteristics of each attribute in a book resource.
 *
 * @author shivani tangellapally <s540965@nwmissouri.edu>
 *
 * For more information about defining sequelize models, see
 * https://sequelize.org/v5/manual/data-types.html
 *
 */
// Export a function that defines the model.
// It automatically receives the Sequelize connection parameter.

module.exports = (db, DataTypes) => {
  db.define('Book', {
    // sqlite creates a rowid attribute automatically
    book: { type: DataTypes.STRING(30) },
    publishedDate: { type: DataTypes.INTEGER },
    isFantasy: { type: DataTypes.BOOLEAN },
  });
};

/** 1. book= "harrypotter ", publishedDate =1997, isFantasy=True

2.book="animalfarm ", publishedDate =1945, isFantasy = False

3.book="hobbit" , publishedDate =1937, isFantasy =True  */

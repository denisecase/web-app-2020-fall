/**
 * Software model
 * Describes each attribute in a software resource
 * @author Joseph Dobelmann <s536997@nwmissouri.edu>
  *
 * For more information about defining sequelize models, see
 * https://sequelize.org/v5/manual/data-types.html
 *
 */
// Export a function that defines the model.
// It automatically receives the Sequelize connection parameter.

const { Sequelize } = require("sequelize/types");

module.exports = (sequelize, DataTypes) => {
    sequelize.define('Software', {
        // sqlite creates a rowid attribute automatically
        name: { type: DataTypes.STRING(30) },
        firstReleased: { type: DataTypes.INTEGERS},
        isOpenSource: { type: DataTypes.BOOLEAN},
    });
};


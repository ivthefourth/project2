
const Users = require("./users.js");

module.exports = function(sequelize, DataTypes) {
  var Levels = sequelize.define("Levels", {
    username: {
    	type: DataTypes.STRING,
      references: {
        model: 'Users',
        key: 'username'
      },
    	allowNull: false,
    	validate: {len: [1, 255]}
	},
    level: {
    	type: DataTypes.BOOLEAN,
    	allowNull: false
    }
  });
  return Levels;
};


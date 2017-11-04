module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define("Users", {
    username: {
    	type: DataTypes.STRING,
    	allowNull: false,
    	unique: true,
	},
    password: {
    	type: DataTypes.STRING,
    	allowNull: false,
    }
  });
  return Users;
};

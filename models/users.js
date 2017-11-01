module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define("Users", {
    username: {
    	type: DataTypes.STRING,
    	allowNull: false,
    	unique: true,
    	validate: {min: 1, max: 255}
	},
    password: {
    	type: DataTypes.STRING,
    	allowNull: false,
    	validate: {min: 1, max: 255}
    }
  });
  return Users;
};

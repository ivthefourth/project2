module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define("Users", {
    username: {
    	type: DataTypes.STRING,
    	allowNull: false,
    	unique: true,
      validate: {
        len: [1, 255]
      }
	},
    password: {
    	type: DataTypes.STRING,
    	allowNull: false,
    }
  });
  return Users;
};

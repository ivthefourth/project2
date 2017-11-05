module.exports = function(sequelize, DataTypes) {
  var Levels = sequelize.define("Levels", {
    username: {
    	type: DataTypes.STRING,
      references: {
       model: Users,
       key: 'username'
       },
    	allowNull: false,
    	unique: true,
    	validate: {min: 1, max: 255}
	},
    levels: {
    	type: DataTypes.STRING,
    	allowNull: false,
    	validate: {min: 1, max: 255}
    }
  });
  return Levels;
};

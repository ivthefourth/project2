

module.exports = function(sequelize, DataTypes) {
  var Levels = sequelize.define("Levels", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    unlocked: {
    	type: DataTypes.BOOLEAN,
    	allowNull: false
    }
  });


  Levels.associate = function(models) {
    Levels.belongsTo(models.Users, {
      foreignKey: {
        allowNull: false
      },
      onDelete: 'cascade'
    });
  };

  return Levels;
};


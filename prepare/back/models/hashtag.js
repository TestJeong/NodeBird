module.exports = (sequelize, DataTypes) => {
  const Hashtag = sequelize.defind(
    "Hashtag",
    {
      name: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
    },
    {
      charset: "utf8mb4",
      collate: "utf8_general_ci",
    }
  );
  hashtag.associate = (db) => {
    db.Hashtag.belongsToMany(db.Post);
  };
  return Hashtag;
};

//User는 모델인데 mysql에서는 소문자 복수형으로 변경이 된다 (users)

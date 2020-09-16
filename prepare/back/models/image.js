module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.defind(
    "Image",
    {
      src: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
  Image.associate = (db) => {};
  return Image;
};

//User는 모델인데 mysql에서는 소문자 복수형으로 변경이 된다 (users)

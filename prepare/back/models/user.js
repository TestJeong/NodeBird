module.exports = (sequelize, DataTypes) => {
  const User = sequelize.defind(
    "User",
    {
      email: {
        type: DataTypes.STRING(30),
        allowNull: false, //이메일 필수
      },
      nickname: {
        type: DataTypes.STRING(30),
        allowNull: false, //닉네임 필수
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false, //이메일 필수
      },
    },
    {
      charset: "utf8mb4",
      collate: "utf8_general_ci",
    }
  );
  User.associate = (db) => {};
  return User;
};

//User는 모델인데 mysql에서는 소문자 복수형으로 변경이 된다 (users)

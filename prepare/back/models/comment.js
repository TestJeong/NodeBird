module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.defind(
    "Comment",
    {
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      charset: "utf8mb4",
      collate: "utf8_general_ci",
    }
  );
  Comment.associate = (db) => {};
  return Comment;
};

//User는 모델인데 mysql에서는 소문자 복수형으로 변경이 된다 (users)

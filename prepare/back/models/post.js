module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.defind(
    "Post",
    {
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      charset: "utf8mb4", // 이모티콘 저장까지.
      collate: "utf8_general_ci",
    }
  );
  Post.associate = (db) => {};
  return Post;
};

//User는 모델인데 mysql에서는 소문자 복수형으로 변경이 된다 (users)

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
  Post.associate = (db) => {
    db.Post.belongsTo(db.User);
    db.Post.belongsToMany(db.Hashtag);
    db.Post.hasMany(db.Comment);
    db.Post.hasMany(db.Image);
    db.Post.belongsToMany(db.User), { through: "Like", as: "Likers" }; //좋아요를 누른사람들
    db.Post.belongsTo(db.Post, { as: "Retweet" });
  };
  return Post;
};

//User는 모델인데 mysql에서는 소문자 복수형으로 변경이 된다 (users)

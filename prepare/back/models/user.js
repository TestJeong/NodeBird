module.exports = (sequelize, DataTypes) => {
  const User = sequelize.defind(
    "User",
    {
      email: {
        type: DataTypes.STRING(30),
        allowNull: false, //이메일 필수
        unique: true, //고유한 값
      },
      nickname: {
        type: DataTypes.STRING(30),
        allowNull: false, //닉네임 필수
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false, //비밀번호 필수
      },
    },
    {
      charset: "utf8mb4",
      collate: "utf8_general_ci",
    }
  );
  User.associate = (db) => {
    db.User.hasMany(db.Post);
    db.User.hanMany(db.Comment);
    db.User.belongsToMany(db.Post, { through: "Like", as: "Liked" });
    db.User.belongsToMany(db.User, {
      through: "Follow",
      as: "Followers",
      foreignKey: "FollowingId",
    });
    db.User.belongsToMany(db.User, {
      through: "Follow",
      as: "Followings",
      foreignKey: "FollowerId",
    });
  };
  return User;
};

//User는 모델인데 mysql에서는 소문자 복수형으로 변경이 된다 (users)
//as는 별칭.
// foreingKey는 같은 모델일때 구별하기 쉽게 이름을 바꿔준다고 생각하면 됨
// through 테이블이 름을 바꿔준다는 것

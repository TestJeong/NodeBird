const passport = require("passport");
const local = require("./local");
const { User } = require("../models");
const { connect } = require("../routes/user");

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
    console.log(user.id);
  }); //req.login의 user 정보가 여기 인자값으로 온다
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findOne({ where: { id } });
      done(null, user);
    } catch (error) {
      console.error(error);
      done(error);
    }
  });

  local();
};



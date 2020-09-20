const express = require("express");
const { User } = require("../models");
const bcrypt = require("bcrypt");
const passport = require("passport");

const router = express.Router();

//미들웨어 확장
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    //// local.js에서 done은 콜백함수와 같다(null, false, reason)이 err, user,info 쪽으로 온다
    if (err) {
      console.error(err);
      return next(err);
    }

    if (info) {
      return res.status(401).send(info.reason);
    }

    return req.logIn(user, async (loginErr) => {
      if (loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }
      return res.json(user);
    });
  })(req, res, next);
}); //POST /user/login

router.post("/", async (req, res, next) => {
  try {
    const exUser = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (exUser) {
      return res.status(403).send("이미 사용 중인 이메일 입니다");
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    await User.create({
      email: req.body.email,
      nickname: req.body.nickname,
      password: hashedPassword,
    });

    ~res.status(200).send("ok");
  } catch (error) {
    console.error(error);
    next(error);
  }
}); // POST /user/

module.exports = router;

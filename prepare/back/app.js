const express = require("express");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const postsRouter = require("./routes/posts");
const postRouter = require("./routes/post");
const userRouter = require("./routes/user");
const hashtagRouter = require("./routes/hashtag")
const db = require("./models");
const app = express();
const passportConfig = require("./passport");
const dotenv = require("dotenv");
const morgan = require("morgan");
const path = require("path");

dotenv.config();

db.sequelize
  .sync()
  .then(() => {
    console.log("db 연결 성공!");
  })
  .catch(console.error);
passportConfig();

app.use(morgan("dev"));

app.use("/", express.static(path.join(__dirname, "uploads")));
// /는 localhost:3065/ 이고 __dirname은 현재 경로를 말해주며 현재경로에 있는 uploads를 합쳐준다 이렇게
// 사용하는 이유는 윈도우와 맥의 경로가 다르기 때문이다 / \

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // form 했을때 받아온 데이터를 해석해서 back쪽에있는 router의 req.body에 보내준다
app.use(cookieParser("nodebiredsecret"));
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("hello express");
});

app.get("/", (req, res) => {
  res.send("hello api");
});

app.use(cors({ origin: true, credentials: true }));
app.use("/posts", postsRouter);
app.use("/post", postRouter);
app.use("/user", userRouter);
app.use("/hashtag", hashtagRouter)

app.listen(3065, () => {
  console.log("서버 실행 중");
});
 
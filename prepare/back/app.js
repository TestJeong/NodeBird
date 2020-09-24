const express = require("express");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const postRouter = require("./routes/post");
const postsRouter = require("./routes/posts");
const userRouter = require("./routes/user");
const db = require("./models");
const app = express();
const passportConfig = require("./passport");
const dotenv = require("dotenv");
const morgan = require("morgan");

dotenv.config();

db.sequelize
  .sync()
  .then(() => {
    console.log("db 연결 성공!");
  })
  .catch(console.error);
passportConfig();

app.use(morgan("dev"));

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

app.use(cors({ origin: true, credentials: true }));
app.use("/posts", postsRouter);
app.use("/post", postRouter);
app.use("/user", userRouter);

app.listen(3065, () => {
  console.log("서버 실행 중");
});

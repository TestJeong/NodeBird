const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const { Post, Comment, Image, User } = require("../models");
const { isLoggedIn } = require("./middlewares");

const router = express.Router();

try {
  fs.accessSync("/uploads");
} catch (error) {
  console.log("uploads 폴더가 없으므로 생성합니다");
  fs.mkdirSync("uploads");
}

router.post("/", isLoggedIn, async (req, res, next) => {
  // POST/post
  try {
    const post = await Post.create({
      content: req.body.content,
      UserId: req.user.id,
    });
    const fullPost = await Post.findOne({
      where: { id: post.id },
      include: [
        { model: Image },
        {
          model: Comment,
          include: [{ model: User, attributes: ["id", "nickname"] }], // 댓글 작성자
        },
        { model: User, attributes: ["id", "nickname"] }, // 게시글 작성자
        {
          model: User, //좋아요 누른 사람
          as: "Likers",
          attributes: ["id"],
        },
      ],
    });
    res.status(201).json(fullPost);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, "uploads");
    },
    filename(req, file, done) {
      // 제로초.png
      const ext = path.extname(file.originalname); //확장자 추출(.png)
      const basename = path.basename(file.originalname, ext); //제로초
      done(null, basename + new Date().getTime() + ext);
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 },
});

router.post(
  "/images",
  isLoggedIn,
  upload.array("image"),
  async (req, res, next) => {
    console.log(req.files); // 업로드 된 후 실행 될것
    res.json(req.files.map((v) => v.filename));
  }
);

router.post("/:postId/comment", isLoggedIn, async (req, res, next) => {
  // POST/comment
  console.log("테스트 ");
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId },
    });
    if (!post) {
      return res.status(403).send("존재하지 않은 게시글입니다");
    }
    const comment = await Comment.create({
      content: req.body.content,
      PostId: parseInt(req.params.postId),
      UserId: req.user.id,
    });
    console.log(comment);
    const fullComment = await Comment.findOne({
      where: { id: comment.id },
      include: [
        {
          model: User,
          attributes: ["id", "nickname"],
        },
      ],
    });
    res.status(201).json(fullComment);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.patch("/:postId/like", isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({ where: { id: req.params.postId } });
    if (!post) {
      return res.status(403).send("게시글이 존재하지 않습니다");
    }
    await post.addLikers(req.user.id);
    res.json({ PostId: post.id, UserId: req.user.id });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.delete("/:postId/like", isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({ where: { id: req.params.postId } });
    if (!post) {
      return res.status(403).send("게시글이 존재하지 않습니다");
    }
    await post.removeLikers(req.user.id);
    res.json({ PostId: post.id, UserId: req.user.id });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.delete("/:postId", isLoggedIn, async (req, res, next) => {
  // DELETE/post
  try {
    await Post.destroy({
      where: { id: req.params.postId, UserId: req.user.id },
    });
    res.json({ PostId: parseInt(req.params.postId, 10) });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;

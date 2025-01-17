import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import { Card, Button, Popover, List, Comment } from "antd";
import {
  RetweetOutlined,
  HeartTwoTone,
  HeartOutlined,
  MessageOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import Link from "next/link";

import { useSelector, useDispatch } from "react-redux";
import Avatar from "antd/lib/avatar/avatar";
import PostImages from "./PostImages";
import CommentForm from "./CommentForm";
import PostCardContent from "./PostCardContent";
import FollowButton from "../components/FollowButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRibbon } from "@fortawesome/free-solid-svg-icons";
import {
  REMOVE_POST_REQUEST,
  LIKE_POST_REQUEST,
  UNLIKE_POST_REQUEST,
  RETWEET_REQUEST,
} from "../reducers/post";

import dayjs from "dayjs";
import "dayjs/locale/ko";
import relativeTime from "dayjs/plugin/relativeTime";
import Noimg from "../img/noimg.png";
import styles from "../styles//postcard.module.scss";

dayjs.locale("ko");
dayjs.extend(relativeTime);

const PostCard = ({ post }) => {
  const dispatch = useDispatch();
  const { removePostLoading } = useSelector((state) => state.post);
  const id = useSelector((state) => state.user.me?.id); // 옵셔널 체이닝
  const { me } = useSelector((state) => state.user);
  const [commetFormOpened, setCommentFormOpened] = useState(false);

  const onLike = useCallback(() => {
    if (!id) {
      return alert("로그인이 필요합니다");
    }
    dispatch({ type: LIKE_POST_REQUEST, data: post.id });
    console.log("포스트카드", post.id);
  }, [id]);

  const onUnLike = useCallback(() => {
    if (!id) {
      return alert("로그인이 필요합니다");
    }
    dispatch({ type: UNLIKE_POST_REQUEST, data: post.id });
  }, [id]);

  const onToggleComment = useCallback(() => {
    setCommentFormOpened((prev) => !prev);
  }, []);

  const onRemovePost = useCallback(() => {
    if (!id) {
      return alert("로그인이 필요합니다");
    }
    dispatch({
      type: REMOVE_POST_REQUEST,
      data: post.id,
    });
  }, [id]);

  const onRetweet = useCallback(() => {
    if (!id) {
      return alert("로그인이 필요합니다");
    }
    return dispatch({
      type: RETWEET_REQUEST,
      data: post.id,
    });
  }, [id]);

  const liked = post.Likers.find((v) => v.id === id);

  return (
    <div className={styles.cardContainer}>
      <Card
        className={styles.card}
        title={
          <>
            {post.User.influencer ? (
              <div>
                {post.User.nickname}
                <FontAwesomeIcon style={{ color: "#40a9ff" }} icon={faRibbon} />
              </div>
            ) : (
              <div>{post.User.nickname}</div>
            )}
          </>
        }
        cover={post.Images[0] && <PostImages images={post.Images} />}
        actions={[
          <RetweetOutlined key="retwwet" onClick={onRetweet} />,
          liked ? (
            <HeartTwoTone
              twoToneColor="#eb2f96"
              key="heart"
              onClick={onUnLike}
            />
          ) : (
            <HeartOutlined key="heart" onClick={onLike} />
          ),
          <MessageOutlined key="comment" onClick={onToggleComment} />,

          <Popover
            key="more"
            content={
              <Button.Group>
                {id && post.User.id === id ? (
                  <>
                    <Button>수정</Button>
                    <Button
                      type="danger"
                      onClick={onRemovePost}
                      loading={removePostLoading}
                    >
                      삭제
                    </Button>
                  </>
                ) : (
                  <Button>신고</Button>
                )}
              </Button.Group>
            }
          >
            <EllipsisOutlined />
          </Popover>,
        ]}
        title={
          post.RetweetId ? (
            `${post.User.nickname}님이 리트윗 하셨습니다`
          ) : (
            <Card.Meta
              className={styles.item_aTag_avatar}
              avatar={
                <Link href={`/user/${post.User.id}`}>
                  <a>
                    <Avatar
                      src={
                        post.User.avatar === null
                          ? Noimg
                          : `http://localhost:3065/avatar/${post.User.avatar}`
                      }
                    ></Avatar>
                  </a>
                </Link>
              }
              title={
                <>
                  {post.User.influencer ? (
                    <div>
                      {post.User.nickname}
                      <FontAwesomeIcon
                        style={{ color: "#40a9ff" }}
                        icon={faRibbon}
                      />
                    </div>
                  ) : (
                    <div>{post.User.nickname}</div>
                  )}
                </>
              }
              description={dayjs(post.createdAt).fromNow()}
            />
          )
        }
        extra={id && <FollowButton post={post} />}
      >
        {post.RetweetId && post.Retweet ? (
          <Card
            cover={
              post.Retweet.Images[0] && (
                <PostImages images={post.Retweet.Images} />
              )
            }
          >
            <Card.Meta
              className={styles.item_aTag_avatar}
              avatar={
                <Link href={`/user/${post.Retweet.User.id}`}>
                  <a>
                    <Avatar
                      src={
                        post.Retweet.User.avatar === null
                          ? Noimg
                          : `http://localhost:3065/avatar/${post.Retweet.User.avatar}`
                      }
                    ></Avatar>
                  </a>
                </Link>
              }
              title={post.Retweet.User.nickname}
              description={<PostCardContent postData={post.Retweet.content} />}
            />
          </Card>
        ) : (
          // postCard content 부분
          <>
            <Card.Meta
              description={<PostCardContent postData={post.content} />}
            />
          </>
        )}
      </Card>
      {commetFormOpened && (
        <div>
          <CommentForm post={post} />
          <List
            className={styles.commentList}
            header={`${post.Comments.length}개의 댓글`}
            itemLayout="horizontal"
            dataSource={post.Comments}
            renderItem={(item) => (
              <li style={{ whiteSpace: "pre-line" }}>
                <Comment
                  author={
                    <>
                      {item.User.influencer ? (
                        <div>
                          {item.User.nickname}
                          <FontAwesomeIcon
                            style={{ color: "#40a9ff" }}
                            icon={faRibbon}
                          />
                        </div>
                      ) : (
                        <div>{item.User.nickname}</div>
                      )}
                    </>
                  }
                  avatar={
                    <Link href={`/user/${item.User.id}`}>
                      <a>
                        <Avatar
                          src={
                            item.User.avatar === null
                              ? Noimg
                              : `http://localhost:3065/avatar/${item.User.avatar}`
                          }
                        ></Avatar>
                      </a>
                    </Link>
                  }
                  content={item.content}
                  datetime={dayjs(item.createdAt).fromNow()}
                />
              </li>
            )}
          />
        </div>
      )}
    </div>
  );
};

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    User: PropTypes.object,
    content: PropTypes.string,
    createAt: PropTypes.string,
    Comment: PropTypes.arrayOf(PropTypes.object),
    Images: PropTypes.arrayOf(PropTypes.object),
    Likers: PropTypes.arrayOf(PropTypes.object),
    RetweetId: PropTypes.number,
    Retweet: PropTypes.objectOf(PropTypes.any),
  }).isRequired,
};

export default PostCard;

// 배열안에 jsx를 넣을때는 항상 key 값을 입력해야한다
// 테스트

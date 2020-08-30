import React from "react";
import PropTypes from "prop-types";
import { Card, Button, Popover } from "antd";
import {
  RetweetOutlined,
  HeartOutlined,
  MessageOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";

const PostCard = ({ post }) => {
  const { me } = useSelector((state) => state.user);
  return (
    <div>
      <Card
        cover={post.Image[0] && <PostImages imges={post.Images} />}
        actions={[
          <RetweetOutlined key="retwwet" />,
          <HeartOutlined key="heart" />,
          <MessageOutlined key="comment" />,

          <Popover
            key="more"
            content={
              <Button.Group>
                <Button>수정</Button>
                <Button type="danger">삭제</Button>
                <Button>신고</Button>
              </Button.Group>
            }
          >
            <EllipsisOutlined />
          </Popover>,
        ]}
      >
        <Image />
        <Content />
        <Button></Button>
      </Card>

      <CommentForm />
      <Comment />
    </div>
  );
};

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    User: PropTypes.object,
    content: PropTypes.string,
    createAt: PropTypes.object,
    Comment: PropTypes.arrayOf(PropTypes.object),
    Images: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

export default PostCard;

// 배열안에 jsx를 넣을때는 항상 key 값을 입력해야한다

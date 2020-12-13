import React from "react";
import styled from "styled-components";
import { List, Button, Avatar, Card } from "antd";
import { StopOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import { UNFOLLOW_REQUEST, REMOVE_FOLLOWER_REQUEST } from "../reducers/user";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";

const ListConatiner = styled(List)`
  width: 90%;
  border-radius: 10px;
  margin: 0 auto 30px auto;
  background-color: white;
  border: 1px solid #f0f0f0;
`;

const FollowList = ({ header, data, onClickMore, loading }) => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const onCancle = (id) => () => {
    if (header === "팔로잉") {
      dispatch({
        type: UNFOLLOW_REQUEST,
        data: id,
      });
    } else {
      dispatch({
        type: REMOVE_FOLLOWER_REQUEST,
        data: id,
      });
    }
  };
  return (
    <ListConatiner
      style={{ marginBottom: 20 }}
      grid={{ gutter: 4, xs: 2, md: 3 }}
      size="small"
      header={<div>{header}</div>}
      loadMore={
        <div style={{ textAlign: "center", margin: "10px 0" }}>
          <Button onClick={onClickMore} loading={loading}>
            더 보기
          </Button>
        </div>
      }
      bordered
      dataSource={data}
      renderItem={(item) => (
        <List.Item style={{ marginTop: 20 }}>
          <Card
            actions={[<StopOutlined key="stop" onClick={onCancle(item.id)} />]}
          >
            <Card.Meta
              description={item.nickname}
              avatar={
                <Link href={`/user/${item.id}`}>
                  <a>
                    <Avatar
                      src={`http://localhost:3065/avatar/${item.avatar}`}
                    ></Avatar>
                  </a>
                </Link>
              }
            />
          </Card>
        </List.Item>
      )}
    />
  );
};

FollowList.propTypes = {
  header: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  // onClickMore: PropTypes.func.isRequired,
  // loading: PropTypes.bool.isRequired
};

export default FollowList;

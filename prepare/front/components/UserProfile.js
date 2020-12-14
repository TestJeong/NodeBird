import React, { useCallback } from "react";
import styled from "styled-components";
import Link from "next/link";
import { Card, Avatar, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { logoutRequestAction } from "../reducers/user";
import styles from "../styles/userprofile.module.scss";
import Noimg from "../img/noimg.png";

const CardConatiner = styled(Card)`
  border-radius: 10px;
  @media (max-width: 1200px) {
    display: none;
  }
  ul {
    border-radius: 0 0 10px 10px;
  }
`;

const UserProfile = () => {
  const dispatch = useDispatch();
  const { me, logOutLoading } = useSelector((state) => state.user);

  const onLogOut = useCallback(() => {
    dispatch(logoutRequestAction());
  });

  console.log("test", me.avatar === null);

  return (
    <CardConatiner
      actions={[
        <div key="twit">
          <Link href={`/user/${me.id}`}>
            <a>
              짹 짹
              <br />
              {me.Posts.length}
            </a>
          </Link>
        </div>,

        <div key="followings">
          <Link href="/profile">
            <a>
              팔로잉
              <br />
              {me.Followings.length}
            </a>
          </Link>
        </div>,

        <div key="followings">
          <Link href="/profile">
            <a>
              팔로워
              <br />
              {me.Followers.length}
            </a>
          </Link>
        </div>,
      ]}
    >
      <Card.Meta
        className={styles.item_aTag_avatar}
        avatar={
          <Link href={`/user/${me.id}`}>
            <a>
              <Avatar
                src={
                  me.avatar === null
                    ? Noimg
                    : `http://localhost:3065/avatar/${me.avatar}`
                }
              ></Avatar>
            </a>
          </Link>
        }
        title={me.nickname}
      />
      <Button onClick={onLogOut} loading={logOutLoading}>
        로그아웃
      </Button>
    </CardConatiner>
  );
};

export default UserProfile;

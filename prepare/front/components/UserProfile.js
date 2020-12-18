import React, { useCallback } from "react";
import styled from "styled-components";
import Link from "next/link";
import { Card, Avatar, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { logoutRequestAction } from "../reducers/user";
import styles from "../styles/userprofile.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRibbon } from "@fortawesome/free-solid-svg-icons";
import Noimg from "../img/noimg.png";

const ButtonContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
`;

const ProfileBnt = styled(Button)`
  margin-right: 20px;
`;

const AvatarContainer = styled(Avatar)`
  width: 100px;
  height: 100px;
`;

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

  console.log("power", me.influencer);

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
              <AvatarContainer
                src={
                  me.avatar === null
                    ? Noimg
                    : `http://localhost:3065/avatar/${me.avatar}`
                }
              />
            </a>
          </Link>
        }
        title={
          <>
            {me.influencer ? (
              <div>
                {me.nickname}
                <FontAwesomeIcon style={{ color: "#40a9ff" }} icon={faRibbon} />
              </div>
            ) : (
              <div>{me.nickname}</div>
            )}
          </>
        }
      />

      <ButtonContainer>
        <Link href="/profile">
          <ProfileBnt type="primary" loading={logOutLoading}>
            내 프로필
          </ProfileBnt>
        </Link>
        <Button onClick={onLogOut} loading={logOutLoading}>
          로그아웃
        </Button>
      </ButtonContainer>
    </CardConatiner>
  );
};

export default UserProfile;

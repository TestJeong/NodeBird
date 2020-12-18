import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRibbon } from "@fortawesome/free-solid-svg-icons";
import { Button } from "antd";
import Link from "next/link";
import Avatar from "antd/lib/avatar/avatar";
import RecommendBtn from "../components/RecommendBtn";

const Container = styled.div`
  width: 100%;
  border: 1px solid #f7f7f7;
  background-color: white;
  border-radius: 10px;
  margin: 0 auto 20px auto;
  padding: 25px;
  @media (max-width: 1200px) {
    width: 90%;
  }
`;

const Title = styled.div`
  font-size: 2vh;
  font-weight: 800;
  margin-bottom: 25px;
  border-bottom: 0.3px solid #eeeeee;
  padding-bottom: 20px;
`;

const FollowContents = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  border-bottom: 0.3px solid #eeeeee;
  padding-bottom: 20px;
`;

const AvatarContents = styled.div`
  font-size: 16px;
  font-weight: 700;
`;

const Nickname = styled.span`
  margin: 0px 5px 0px 15px;
`;

const FollowBtn = styled.div``;

const FollowRecommend = () => {
  const { recommendFollowList } = useSelector((state) => state.user);

  return (
    <Container>
      <Title>팔로우 추천</Title>

      {recommendFollowList.map((user) => (
        <FollowContents>
          <AvatarContents>
            <Avatar src={`http://localhost:3065/avatar/${user.avatar}`} />
            <Nickname>{user.nickname}</Nickname>
            <FontAwesomeIcon style={{ color: "#40a9ff" }} icon={faRibbon} />
          </AvatarContents>

          <FollowBtn>
            <RecommendBtn post={user} />
          </FollowBtn>
        </FollowContents>
      ))}
    </Container>
  );
};

export default FollowRecommend;

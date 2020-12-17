import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRibbon } from "@fortawesome/free-solid-svg-icons";
import { Button } from "antd";
import Link from "next/link";
import Avatar from "antd/lib/avatar/avatar";
import FollowButton from "../components/FollowButton";

const Container = styled.div`
  width: 100%;
  border: 1px solid #f7f7f7;
  background-color: white;
  border-radius: 10px;
  margin: 0 auto 20px auto;
  padding: 15px;
  @media (max-width: 1200px) {
    width: 90%;
  }
`;

const Title = styled.div`
  font-size: 2vh;
  margin-bottom: 20px;
`;

const FollowContents = styled.div``;

const AvatarContainer = styled.div``;

const FollowRecommend = () => {
  const { recommendFollowList } = useSelector((state) => state.user);

  return (
    <Container>
      <Title>팔로우 추천</Title>
      <AvatarContainer>
        {recommendFollowList.map((user) => (
          <FollowContents>
            <Avatar src={`http://localhost:3065/avatar/${user.avatar}`} />
            {user.nickname}
            <FontAwesomeIcon style={{ color: "#40a9ff" }} icon={faRibbon} />
          </FollowContents>
        ))}
      </AvatarContainer>
    </Container>
  );
};

export default FollowRecommend;

import React from "react";
import styled from "styled-components";
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
  return (
    <Container>
      <Title>팔로우 추천</Title>
      <AvatarContainer>
        <FollowContents>
          <Avatar
            src={"http://localhost:3065/avatar/김봉진_1607860934601.jpeg"}
          />
        </FollowContents>
      </AvatarContainer>
    </Container>
  );
};

export default FollowRecommend;

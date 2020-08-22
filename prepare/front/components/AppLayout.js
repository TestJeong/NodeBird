import React, { useState } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { Menu, Input, Row, Col } from "antd";
import LoginForm from "../components/LoginForm";
import UserProfile from "../components/UserProfile";
import styled from "styled-components";

const SearchInput = styled(Input.Search)`
  vertical-align: "middle";
`;

const AppLayout = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div>
      <Menu mode="horizontal">
        <Menu.Item>
          <Link href="/">
            <a>노드버드</a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/profile">
            <a>프로필</a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <SearchInput />
        </Menu.Item>
        <Menu.Item>
          <Link href="/signup">
            <a>회원가입</a>
          </Link>
        </Menu.Item>
      </Menu>
      <Row gutter={8}>
        <Col xs={24} md={6}>
          {isLoggedIn ? (
            <UserProfile setIsLoggedIn={setIsLoggedIn} />
          ) : (
            <LoginForm setIsLoggedIn={setIsLoggedIn} />
          )}
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}>
          <a
            href="https://testjeong.github.io/"
            target="_blank"
            rel="noreferrer noopener"
          >
            Made by YunJae
          </a>
        </Col>
      </Row>
    </div>
  );
};

// gutter 컴럼사이의 간격 양쪽 합쳐 8px

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;

//page들이 쓸 공통적인 레이아웃

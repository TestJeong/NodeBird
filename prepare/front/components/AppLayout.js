import React,{useCallback} from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { Menu, Input, Row, Col } from "antd";
import Router from 'next/router'
import LoginForm from "../components/LoginForm";
import UserProfile from "../components/UserProfile";
import styled from "styled-components";
import { useSelector } from "react-redux";
import useInput from "../hooks/useInput";
import RecommendFollow from "./RecommendFollow";
import styles from '../styles/customFollow.module.scss'

const SearchInput = styled(Input.Search)`
  vertical-align: middle;
`;

const AppLayout = ({ children }) => {
  const [searchInput, onChangeSearchInput] = useInput("")
  const { me } = useSelector((state) => state.user); // 데이터가 변경되면 알아서 리렌더링이 된다

  const onSearch = useCallback(() => {
    Router.push(`/hashtag/${searchInput}`)
  },[searchInput])

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
          <SearchInput 
          enterButton
          value={searchInput}
          onChange={onChangeSearchInput}
          onSearch={onSearch}
           />
        </Menu.Item>
        <Menu.Item>
          <Link href="/signup">
            <a>회원가입</a>
          </Link>
        </Menu.Item>
      </Menu>
      <Row gutter={8}>
        <Col xs={24} md={6}>
          {me ? <UserProfile /> : <LoginForm />}
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}>
          <RecommendFollow />
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

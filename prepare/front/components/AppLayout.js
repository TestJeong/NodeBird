import React, { useCallback } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { Button, Input, Row, Col, Card, Avatar } from "antd";
import {
  TwitterOutlined,
  NotificationOutlined,
  MessageOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import Router from "next/router";
import LoginForm from "../components/LoginForm";
import UserProfile from "../components/UserProfile";
import styled from "styled-components";
import { useSelector } from "react-redux";
import useInput from "../hooks/useInput";
import styles from "../styles//applayout.module.scss";
import FollowRecommend from "./FollowRecommend";

const SearchInput = styled(Input.Search)`
  vertical-align: middle;
  width: 94%;
`;

const AppLayout = ({ children }) => {
  const [searchInput, onChangeSearchInput] = useInput("");
  const { me } = useSelector((state) => state.user); // 데이터가 변경되면 알아서 리렌더링이 된다

  const onSearch = useCallback(() => {
    Router.push(`/hashtag/${searchInput}`);
  }, [searchInput]);

  return (
    <div style={{ backgroundColor: "#f7f7f7" }}>
      <div className={styles.container}>
        <nav className={styles.item}>
          <Link href="/">
            <a className={styles.item_aTag_Mainlogo}>
              <TwitterOutlined />
            </a>
          </Link>
          <Link href="">
            <a className={styles.item_aTag_logo}>
              <NotificationOutlined />
            </a>
          </Link>
          <Link href="">
            <a className={styles.item_aTag_logo}>
              <MessageOutlined />
            </a>
          </Link>
        </nav>

        <nav className={styles.item}>
          <SearchInput
            enterButton
            value={searchInput}
            onChange={onChangeSearchInput}
            onSearch={onSearch}
            placeholder={"Search Twitter"}
          />
        </nav>

        <nav className={styles.item_avatar}>
          {me ? (
            <Card.Meta
              className={styles.item_aTag_avatar}
              avatar={
                <Link href={`/user/${me.id}`}>
                  <a>
                    <Avatar
                      src={`http://localhost:3065/avatar/${me.avatar}`}
                    ></Avatar>
                  </a>
                </Link>
              }
            />
          ) : (
            <Link href="/signup">
              <a className={styles.item_aTag_avatar}>
                <Button type="primary">SIGN UP</Button>
              </a>
            </Link>
          )}
        </nav>
      </div>
      <Row style={{ padding: "0px 10px" }}>
        <Col xs={24} md={6}>
          {me ? <UserProfile /> : <LoginForm />}
        </Col>
        <Col xs={24} md={12} style={{ backgroundColor: "#f7f7f7" }}>
          {children}
        </Col>
        <Col xs={24} md={6} style={{ backgroundColor: "#f7f7f7" }}>
          <FollowRecommend />
        </Col>
      </Row>
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;

//page들이 쓸 공통적인 레이아웃

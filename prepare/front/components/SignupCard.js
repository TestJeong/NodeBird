import React from "react";
import styled from "styled-components";
import { Card, Button } from "antd";
import Link from "next/link";
import styles from "../styles/SignUp_Card.module.scss";
import SignUpImage from "../img/clip.png";

const Image = styled.img`
  width: 100%;
  height: auto;
`;

const SignupCard = () => {
  return (
    <Card className={styles.container}>
      <Image src={SignUpImage} alt="image" />
      <p>
        <h1>
          사람들이 무엇에 대해 얘기하고 있는지 알아보세요
          <br />
          당신은 무엇에 관심이있나요?
        </h1>
      </p>
      <p>당신의 일상이 궁금해요 함께 공유해주세요!</p>
      <p>
        {
          <Link href="/signup">
            <a className={styles.item_aTag_avatar}>
              <Button type="primary">SIGN UP</Button>
            </a>
          </Link>
        }
      </p>
    </Card>
  );
};

export default SignupCard;

import React from "react";
import { Card, Button } from "antd";
import Link from "next/link";
import styles from "../styles/SignUp_Card.module.scss";

const SignupCard = () => {
  return (
    <Card className={styles.container}>
      <img src={"https://ifh.cc/g/QfJ6NR.jpg"} alt="" />
      <p>
        <h1>
          Wellcome! Nice to meet You &&
          <br />
          sdafsdfasdfa
        </h1>
      </p>
      <p>How are you? Have a good day?</p>
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

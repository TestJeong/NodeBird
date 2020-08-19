import React from "react";
import Head from "next/head";
import AppLayout from "../components/AppLayout";

const Profile = () => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>내 프로필 | NodeBird</title>
      </Head>
      <AppLayout>
        <div>내 프로파일</div>
      </AppLayout>
    </>
  );
};

export default Profile;

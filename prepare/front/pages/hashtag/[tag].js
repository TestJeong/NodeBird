import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { END } from "redux-saga";

import axios from "axios";
import { LOAD_HASHTAG_POSTS_REQUEST } from "../../reducers/post";
import PostCard from "../../components/PostCard";
import wrapper from "../../store/configureStore";
import {
  LOAD_MY_INFO_REQUEST,
  RECOMMEND_FOLLOW_LIST_REQUEST,
} from "../../reducers/user";
import AppLayout from "../../components/AppLayout";

const Hashtag = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { tag } = router.query;
  const { mainPosts, hasMorePosts, loadPostsLoading } = useSelector(
    (state) => state.post
  );

  useEffect(() => {
    console.log("adsfad", mainPosts);
    const onScroll = () => {
      if (
        window.pageYOffset + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 300
      ) {
        if (hasMorePosts && !loadPostsLoading) {
          dispatch({
            type: LOAD_HASHTAG_POSTS_REQUEST,
            lastId:
              mainPosts[mainPosts.length - 1] &&
              mainPosts[mainPosts.length - 1].id,
            data: tag,
          });
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [mainPosts.length, hasMorePosts, tag, loadPostsLoading]);

  return (
    <AppLayout>
      {mainPosts.map((c) => (
        <PostCard key={c.id} post={c} />
      ))}
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    const cookie = context.req ? context.req.headers.cookie : "";
    console.log(context);
    axios.defaults.headers.Cookie = "";
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
    context.store.dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });
    context.store.dispatch({
      type: RECOMMEND_FOLLOW_LIST_REQUEST,
    });
    context.store.dispatch({
      type: LOAD_HASHTAG_POSTS_REQUEST,
      data: context.params.tag,
    });
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  }
);

export default Hashtag;

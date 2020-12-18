import React, { useCallback } from "react";
import { Button } from "antd";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { UNFOLLOW_REQUEST, FOLLOW_REQUEST } from "../reducers/user";

const RecommendBtn = ({ post }) => {
  const { me, followLoading, unfollowLoading } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();
  const isFollowing = me?.Followings.find((v) => v.id === post.id);
  const onClickButton = useCallback(() => {
    if (isFollowing) {
      dispatch({ type: UNFOLLOW_REQUEST, data: post.id });
    } else {
      dispatch({ type: FOLLOW_REQUEST, data: post.id });
    }
  }, [isFollowing]);
  if (me === null) {
    return null;
  } else {
    if (post.id === me.id) {
      return null;
    }
  }
  return (
    <Button
      type="primary"
      onClick={onClickButton}
      loading={followLoading || unfollowLoading}
    >
      {isFollowing ? "언팔로우" : "팔로우"}
    </Button>
  );
};

RecommendBtn.propTypes = {
  post: PropTypes.object.isRequired,
};

export default RecommendBtn;

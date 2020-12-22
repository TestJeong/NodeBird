import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";
import PostImages from "./PostImages";

const PostCardContent = ({ postData }) => (
  <div style={{ whiteSpace: "pre-line" }}>
    {postData.split(/(#[^\s#]+)/g).map((v, i) => {
      if (v.match(/(#[^\s#]+)/g)) {
        return (
          <Link href={`/hashtag/${v.slice(1)}`} key={i}>
            <a>{v}</a>
          </Link>
        );
      }
      return v;
    })}
  </div>
);

PostCardContent.propTypes = { postData: PropTypes.string };

export default PostCardContent;

//

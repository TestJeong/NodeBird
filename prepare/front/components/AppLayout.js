import React from "react";
import PropTypes from "prop-types";

const AppLayout = ({ children }) => {
  return (
    <div>
      <div>
        공통메뉴
        {children}
      </div>
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;


//page들이 쓸 공통적인 레이아웃
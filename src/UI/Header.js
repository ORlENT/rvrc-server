import React from "react";

const Header = ({ children, ...rest }) => (
  <h2 style={{ color: "#fff", textAlign: "center", margin: "0px" }} {...rest}>
    {children}
  </h2>
);

export default Header;

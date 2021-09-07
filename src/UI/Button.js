import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

const MyButton = ({ secondary, admin, children, success, error, ...rest }) => (
  <Button
    variant={secondary ? "outlined" : "contained"}
    color={admin ? "secondary" : "primary"}
    style={{
      width: "100%",
      backgroundColor: success ? "#4caf50" : error ? "#f44336" : "",
    }}
    {...rest}
  >
    {children}
  </Button>
);

export const NavButton = ({ to, children, ...rest }) => (
  <Link to={to} style={{ textDecoration: "none" }}>
    <MyButton {...rest}>{children}</MyButton>
  </Link>
);

export const SubmitButton = ({ children, ...rest }) => (
  <MyButton type="submit" {...rest}>
    {children}
  </MyButton>
);

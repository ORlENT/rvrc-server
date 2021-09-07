import React from "react";
import { CircularProgress } from "@material-ui/core";

export const LoadingScreen = ({ ...rest }) => (
  <div
    className="centerContent"
    style={{
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      position: "fixed",
      top: "0",
      width: "100%",
      height: "100%",
      zIndex: "1000",
    }}
    {...rest}
  >
    <CircularProgress />
    <br />
    <h3 style={{ color: "#fff", textAlign: "center", margin: "0px" }}>
      Loading...
    </h3>
  </div>
);

export const LoadingScreenSmall = ({ ...rest }) => (
  <div
    className="centerContent"
    style={{
      position: "fixed",
      top: "0",
      width: "100%",
      height: "100%",
      zIndex: "1000",
    }}
    {...rest}
  >
    <div
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        borderRadius: "25px",
        padding: "50px",
        margin: "-25px",
      }}
    >
      <CircularProgress />
    </div>
  </div>
);

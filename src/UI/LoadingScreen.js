import React from "react";
import { CircularProgress } from "@material-ui/core";

export const LoadingScreen = ({ ...rest }) => (
  <div className="centerContent" style={{ height: "100%" }} {...rest}>
    <CircularProgress />
    <br />
    <h3 style={{ color: "#fff", textAlign: "center", margin: "0px" }}>
      Loading...
    </h3>
  </div>
);

export const LoadingScreenSmall = ({ ...rest }) => (
  <div className="centerContent" style={{ height: "100%" }} {...rest}>
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

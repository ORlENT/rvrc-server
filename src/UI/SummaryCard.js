import React from "react";
import { Card, CardContent } from "@material-ui/core";

export const PtCard = ({ title, content, ...rest }) => (
  <Card
    style={{
      backgroundColor: "#555",
      position: "relative",
    }}
    {...rest}
  >
    <CardContent
      style={{
        width: "100%",
        padding: "16px",
        paddingLeft: "24px",
        WebkitBoxSizing: "border-box",
      }}
    >
      {/*border highlight*/}
      <div
        style={{
          width: "8px",
          backgroundColor: "#ff9800",
          position: "absolute",
          top: "0",
          bottom: "0",
          left: "0",
        }}
      />
      {/*content*/}
      <p
        style={{
          color: "#fff",
          margin: "0px",
          float: "right",
          textAlign: "right",
        }}
      >
        {content}
      </p>
      {/*title*/}
      <h3
        style={{
          color: "#fff",
          margin: "0px",
        }}
      >
        {title}
      </h3>
    </CardContent>
  </Card>
);

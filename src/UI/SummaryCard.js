import React from "react";
import { Card, CardContent } from "@material-ui/core";

export const PtCard = ({ title, subtitle, content, highlight, ...rest }) => (
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
        paddingLeft: highlight ? "24px" : "16px",
        WebkitBoxSizing: "border-box",
      }}
    >
      {/*border highlight*/}
      {highlight && (
        <div
          style={{
            width: "8px",
            backgroundColor: highlight,
            position: "absolute",
            top: "0",
            bottom: "0",
            left: "0",
          }}
        />
      )}
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
      <p
        style={{
          color: "#bbb",
          margin: "0px",
        }}
      >
        <b
          style={{
            color: "#fff",
          }}
        >
          {title}
        </b>
        {" " + subtitle}
      </p>
    </CardContent>
  </Card>
);

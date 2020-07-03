import React from "react";

const size = 24;

const Notification = ({ active, children }) => (
  <div
    style={{
      position: "relative",
    }}
  >
    {active && (
      <div
        style={{
          height: size,
          width: size,
          borderRadius: "50%",
          position: "absolute",
          top: -size / 2,
          right: -size / 2,
          textAlign: "center",
          backgroundColor: "#f57c00",
          boxShadow: "0 0 3px #000",
          margin: "0px",
          zIndex: "1",
        }}
      >
        <b
          style={{
            color: "#fff",
            margin: "0px",
          }}
        >
          !
        </b>
      </div>
    )}
    {children}
  </div>
);

export default Notification;

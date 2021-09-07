import React, { Component } from "react";
import { Paper } from "@material-ui/core";

class ShipDisplay extends Component {
  render() {
    const { image, children, width = 180 } = this.props;

    return (
      <Paper
        elevation={24}
        style={{
          height: 230,
          width: width,
          padding: "12px",
          marginTop: "24px",
          marginBottom: "24px",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            height: 180,
            marginBottom: "12px",
          }}
        >
          <img
            src="water.gif"
            alt="water for you thirsty hoes"
            style={{
              position: "relative",
              width: "100%",
              height: 180,
              objectFit: "none",
              marginBottom: "12px",
            }}
          />
          <img
            src={image}
            alt="(relation)ships"
            style={{
              position: "absolute",
              bottom: 0,
              left: (width - 220) / 2,
              width: 220,
              height: 220,
              objectFit: "contain",
            }}
          />
        </div>
        {children}
      </Paper>
    );
  }
}

export default ShipDisplay;

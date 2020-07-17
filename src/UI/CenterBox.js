import React, { Component } from "react";
import { Grid, Paper } from "@material-ui/core";
import withWidth, { isWidthDown } from "@material-ui/core/withWidth";

class CenterBox extends Component {
  render() {
    const { width, children } = this.props;

    //MOBILE VERSION
    if (isWidthDown("xs", width)) {
      return (
        <div
          className="centerContent"
          style={{
            maxWidth: "100vw",
            boxSizing: "border-box",
            height: "100%",
            padding: "32px",
            backgroundColor: "#333",
          }}
        >
          <Grid
            container
            spacing={2}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ maxWidth: "100%" }}
          >
            {React.Children.map(children, (child) =>
              child ? (
                <Grid item style={{ width: "100%" }}>
                  {child}
                </Grid>
              ) : null
            )}
          </Grid>
        </div>
      );
    }

    //WEB VERSION
    return (
      <div
        className="centerContent"
        style={{
          height: "100%",
        }}
      >
        <Paper
          elevation={3}
          className="centerContent"
          style={{
            width: "480px",
            padding: "32px",
            margin: "32px",
            backgroundColor: "#444",
          }}
        >
          <Grid
            container
            spacing={2}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ width: "100%" }}
          >
            {React.Children.map(children, (child) =>
              child ? (
                <Grid item style={{ width: "100%" }}>
                  {child}
                </Grid>
              ) : null
            )}
          </Grid>
        </Paper>
      </div>
    );
  }
}

export default withWidth()(CenterBox);

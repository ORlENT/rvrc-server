import React, { Component } from "react";
import { Grid, Paper } from "@material-ui/core";
import withWidth from "@material-ui/core/withWidth";

class SideBox extends Component {
  render() {
    const { children, ...rest } = this.props;

    return (
      <div
        style={{
          height: "100%",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "flex-end",
          flexDirection: "column",
        }}
        {...rest}
      >
        <Paper
          elevation={3}
          className="centerContent"
          style={{
            width: "300px",
            padding: "12px",
            margin: "12px",
            backgroundColor: "#444",
            zIndex: "5",
          }}
        >
          <Grid className="centerContent" container spacing={1}>
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

export default withWidth()(SideBox);

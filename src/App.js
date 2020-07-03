import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Points from "./Points.js";

const theme = createMuiTheme({
  palette: {
    type: "dark",

    // Normal user color: Orange
    primary: {
      main: "#ff9800",
    },

    // Admin color: Blue
    secondary: {
      main: "#2196f3",
    },
  },
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <Points />
        </BrowserRouter>
      </MuiThemeProvider>
    );
  }
}

export default App;

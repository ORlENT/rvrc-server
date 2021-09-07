import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Points from "./Points.js";

const theme = createMuiTheme({
  palette: {
    type: "dark",

    // Normal user color:
    // #9c27b0 Purple
    // #ff9800 Orange
    primary: {
      main: "#ff9800",
    },

    // Admin color:
    // #4caf50 Green
    // #2196f3 Blue
    secondary: {
      main: "#2196f3",
    },

    success: {
      main: "#4caf50",
    },

    error: {
      main: "#f44336",
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

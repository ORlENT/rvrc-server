import React, { Component } from "react";
import { NavButton, CenterBox } from "../UI";

class Home extends Component {
  render() {
    return (
      <CenterBox>
        <img src="logoHome.png" alt="Home Logo" width="100%" />
        <NavButton to="/join">Join Camp</NavButton>
        <NavButton to="/create" secondary>
          Create New Camp
        </NavButton>
      </CenterBox>
    );
  }
}

export default Home;

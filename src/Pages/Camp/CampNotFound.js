import React, { Component } from "react";
import { Header, NavButton, CenterBox } from "../../UI";

class CampNotFound extends Component {
  render() {
    const { match } = this.props;
    return (
      <CenterBox>
        <Header>Camp {match.params.campCode} was not found</Header>
        <NavButton to="/join">Join Another Camp</NavButton>
        <NavButton to="/create" secondary>
          Create New Camp
        </NavButton>
      </CenterBox>
    );
  }
}

export default CampNotFound;

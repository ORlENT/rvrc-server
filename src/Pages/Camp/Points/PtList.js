import React, { Component } from "react";
import { connect } from "react-redux";
import { Header, CenterBox, PtCard, NavButton } from "../../../UI";

class PtList extends Component {
  render() {
    let { grpInfo, match, isAuthed } = this.props;
    return (
      <CenterBox>
        <Header>Points</Header>

        {/*No reports (Admin only) */}
        {Object.keys(grpInfo).length === 0 && (
          <Header>No group was found.</Header>
        )}

        {/*Create new Group button (Admin only)*/}
        {isAuthed && (
          <NavButton admin to={`${match.url}/create`}>
            Create new group
          </NavButton>
        )}

        {/*Transfer points button (Admin only)*/}
        {isAuthed && (
          <NavButton admin to={`${match.url}/transfer`}>
            Transfer points
          </NavButton>
        )}

        {/*Report List*/}
        {grpInfo &&
          Object.keys(grpInfo).map((key) => (
            <PtCard
              key={key}
              title={grpInfo[key].groupName}
              content={grpInfo[key].point}
              to={`${match.url}/${key}`}
            />
          ))}
      </CenterBox>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    grpInfo: state.store.camp.groups,
    isAuthed: state.store.isAuthed,
  };
};

export default connect(mapStateToProps)(PtList);

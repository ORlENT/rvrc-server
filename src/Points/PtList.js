import React, { Component } from "react";
import { connect } from "react-redux";
import { Header, CenterBox, PtCard, NavButton } from "../UI";

class PtList extends Component {
  render() {
    let { grpInfo, isAuthed } = this.props;
    return (
      <CenterBox>
        {/*No group found*/}
        {Object.keys(grpInfo).length === 0 && (
          <Header>No group was found.</Header>
        )}

        {/*Transfer points button (Admin only)*/}
        {isAuthed && (
          <NavButton admin to={`/transfer`}>
            Transfer points
          </NavButton>
        )}

        {/*Group List*/}
        {grpInfo &&
          Object.keys(grpInfo).map((key) => (
            <PtCard
              key={key}
              title={grpInfo[key].name}
              content={grpInfo[key].points}
            />
          ))}
      </CenterBox>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    grpInfo: state.store.groups,
    isAuthed: state.store.isAuthed,
  };
};

export default connect(mapStateToProps)(PtList);

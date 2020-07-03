import React, { Component } from "react";
import { connect } from "react-redux";
import { Header, CenterBox, SubmitButton, NavButton } from "../../../UI";
import timeConverter from "../../../functions/timeConverter";
import { deleteGrp } from "../../../store/actions";

class GrpDetails extends Component {
  componentDidMount() {
    this.setState({ grpID: this.props.match.params.grpID });
  }

  handleDelete = () => {
    this.props.deleteGrp(this.state);
    this.props.history.goBack();
  };

  render() {
    const { grpInfo, isAuthed, match } = this.props;
    const key = match.params.grpID;
    return (
      <CenterBox>
        <Header>{grpInfo[key].groupName}</Header>

        {/*Delete Group button (Admin only)*/}
        {isAuthed && (
          <SubmitButton admin secondary onClick={this.handleDelete}>
            Delete Group
          </SubmitButton>
        )}

        {/*Edit Announcement button (Admin only)*/}
        {isAuthed && (
          <NavButton admin to={`${match.url}/ptAdd`}>
            Add Points
          </NavButton>
        )}

        {/*timestamp*/}
        <p style={{ color: "#bbb", margin: "0px" }}>
          Posted on {timeConverter(grpInfo[key].timestamp)}
        </p>

        {/*content*/}
        <p
          style={{
            color: "#fff",
            margin: "0px",
            marginTop: "8px",
            marginBottom: "8px",
          }}
        >
          {grpInfo[key].point}
        </p>
      </CenterBox>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    grpInfo: state.store.camp.groups,
    isAuthed: state.store.isAuthed,
    camp: state.store.camp,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteGrp: (state) => dispatch(deleteGrp(state)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GrpDetails);

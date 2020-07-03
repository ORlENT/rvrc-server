import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import { Header, NavButton, CenterBox, SubmitButton } from "../../UI";
import { deleteCamp } from "../../store/actions";

class Dashboard extends Component {
  handleDelete = () => {
    this.props.deleteCamp(this.state);
    this.props.history.push("/");
  };

  render() {
    const { match, isAuthed } = this.props;
    return (
      <CenterBox>
        <Header>Dashboard</Header>

        <NavButton to={`${match.url}/pt`}>Points</NavButton>

        {isAuthed && (
          <NavButton admin to={`${match.url}/edit`}>
            Edit camp
          </NavButton>
        )}

        {isAuthed && (
          <NavButton admin to={`${match.url}/passwordedit`}>
            Edit password
          </NavButton>
        )}

        {isAuthed && (
          <SubmitButton admin secondary onClick={this.handleDelete}>
            Delete Camp
          </SubmitButton>
        )}
      </CenterBox>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthed: state.store.isAuthed,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteCamp: (state) => dispatch(deleteCamp(state)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)(Dashboard);

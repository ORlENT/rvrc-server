import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Header, SubmitButton, CenterBox, Field, Form } from "../../../UI";
import { createGrp } from "../../../store/actions";

class GrpCreate extends Component {
  successHandler(state, props) {
    props.history.goBack();
  }

  render() {
    return (
      <CenterBox>
        <Header>Create New Group</Header>
        <Form
          onSubmit={this.props.createGrp}
          onSuccess={this.successHandler}
          history={this.props.history}
        >
          <Field id="groupname">Group Name</Field>
          <Field id="point">Points</Field>
          <SubmitButton>Create New Group</SubmitButton>
        </Form>
      </CenterBox>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createGrp: (state) => dispatch(createGrp(state)),
  };
};

export default compose(
  connect(null, mapDispatchToProps),
  withRouter
)(GrpCreate);

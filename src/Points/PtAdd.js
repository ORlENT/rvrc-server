import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Header, SubmitButton, CenterBox, Field, Form } from "../UI";
import { addPt } from "../store/actions";
import ValidationError from "../errors/ValidationError";

class PtAdd extends Component {
  validate = (state) => {
    if (isNaN(state.newpoint)) {
      throw new ValidationError(
        "newpoint",
        "Point must be numerical characters."
      );
    }
  };

  successHandler(state, props) {
    props.history.goBack();
  }

  render() {
    const { grpInfo, match, addPt, history } = this.props;
    return (
      <CenterBox>
        <Header>Add Points to {grpInfo[match.params.grpID].groupName}</Header>
        <Form
          admin
          onSubmit={addPt}
          onSuccess={this.successHandler}
          validate={this.validate}
          history={history}
          grpID={match.params.grpID}
        >
          <Field id="newpoint">Points</Field>
          <SubmitButton>Add Points</SubmitButton>
        </Form>
      </CenterBox>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    grpInfo: state.store.groups,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addPt: (state, props) => dispatch(addPt(state, props)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)(PtAdd);

import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Header, SubmitButton, CenterBox, Field, Form } from "../UI";
import { signUp } from "../store/actions";
import ValidationError from "../errors/ValidationError";

class CreateCamp extends Component {
  validate = (state) => {
    if (state.password && state.password.length < 8) {
      throw new ValidationError(
        "password",
        "Password must be at least 8 characters"
      );
    }
  };

  successHandler(state, props) {
    console.log(props.history);
    props.history.push("/camp/" + state.campCode);
  }

  failHandler() {
    throw new ValidationError("campCode", "Camp Code is already in use");
  }

  render() {
    return (
      <CenterBox>
        <Header>Create New Camp</Header>
        <Form
          onSubmit={this.props.signUp}
          validate={this.validate}
          onSuccess={this.successHandler}
          onFail={this.failHandler}
          history={this.props.history}
        >
          <Field id="campName">Camp Name</Field>
          <Field id="campCode">Camp Code</Field>
          <Field id="password" password>
            Password
          </Field>
          <SubmitButton>Create New Camp</SubmitButton>
        </Form>
      </CenterBox>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (state) => dispatch(signUp(state)),
  };
};

export default compose(
  connect(null, mapDispatchToProps),
  withRouter
)(CreateCamp);

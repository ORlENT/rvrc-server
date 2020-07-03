import React, { Component } from "react";
import { connect } from "react-redux";
import { Header, SubmitButton, CenterBox, Field, Form } from "../UI";
import { signIn } from "../store/actions";
import ValidationError from "../errors/ValidationError";

class AdminLogin extends Component {
  failHandler() {
    throw new ValidationError("password", "Password is incorrect");
  }

  render() {
    return (
      <div style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", height: "100vh" }}>
        <CenterBox>
          <Header>Admin Login</Header>
          <Form admin onSubmit={this.props.signIn} onFail={this.failHandler}>
            <Field id="password" password autoFocus>
              Password
            </Field>
            <SubmitButton>Login</SubmitButton>
          </Form>
          <SubmitButton secondary admin onClick={this.props.toggleVisibility}>
            Back
          </SubmitButton>
        </CenterBox>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (state) => dispatch(signIn(state)),
  };
};

export default connect(null, mapDispatchToProps)(AdminLogin);

import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Header, SubmitButton, CenterBox, Select, Field, Form } from "../UI";
import { signIn } from "../store/actions";
import ValidationError from "../errors/ValidationError";

class AdminLogin extends Component {
  validate = (state) => {
    if (!state.groupname) {
      throw new ValidationError("groupname", "Please select your Station");
    }
  };

  failHandler() {
    throw new ValidationError("password", "Password is incorrect");
  }

  successHandler(state, props) {
    props.history.push("/transfer");
    props.toggleVisibility();
  }

  render() {
    return (
      <div style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", height: "100vh" }}>
        <CenterBox>
          <Header>Admin Login</Header>
          <Form
            admin
            onSubmit={this.props.signIn}
            validate={this.validate}
            onFail={this.failHandler}
            onSuccess={this.successHandler}
            history={this.props.history}
            toggleVisibility={this.props.toggleVisibility}
          >
            <Select
              label="Station"
              id="groupname"
              choices={this.props.groups}
            />
            <Field id="password" password>
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

const mapStateToProps = (state) => {
  return {
    groups: Object.values(state.store.groups),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (state) => dispatch(signIn(state)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)(AdminLogin);

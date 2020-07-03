import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Header, SubmitButton, CenterBox, Field, Form } from "../../UI";
import { editPassword } from "../../store/actions";
import ValidationError from "../../errors/ValidationError";

class PasswordEdit extends Component {
  validate = (state) => {
    if (state.password && state.password.length < 8) {
      throw new ValidationError(
        "password",
        "Password must be at least 8 characters"
      );
    }
  };

  successHandler(state, props) {
    props.history.goBack();
  }

  render() {
    return (
      <CenterBox>
        <Header>Edit Password</Header>
        <Form
          admin
          onSubmit={this.props.editPassword}
          validate={this.validate}
          onSuccess={this.successHandler}
          history={this.props.history}
        >
          <Field id="password" value={""}>
            New Password
          </Field>
          <SubmitButton>Edit Password</SubmitButton>
        </Form>
      </CenterBox>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    camp: state.store.camp,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editPassword: (state) => dispatch(editPassword(state)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)(PasswordEdit);

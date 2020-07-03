import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Header, SubmitButton, CenterBox, Field, Form } from "../../UI";
import { editCamp } from "../../store/actions";
import ValidationError from "../../errors/ValidationError";

class CampEdit extends Component {
  successHandler(state, props) {
    props.history.push("/camp/" + state.campCode);
  }

  failHandler() {
    throw new ValidationError("campCode", "Camp Code is already in use");
  }

  render() {
    const { editCamp, history, camp } = this.props;
    return (
      <CenterBox>
        <Header>Edit Camp</Header>
        <Form
          admin
          onSubmit={editCamp}
          onSuccess={this.successHandler}
          onFail={this.failHandler}
          history={history}
        >
          <Field id="campName" value={camp.campName}>
            Camp Name
          </Field>
          <Field id="campCode" value={camp.campCode}>
            Camp Code
          </Field>
          <SubmitButton>Edit Camp</SubmitButton>
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
    editCamp: (state) => dispatch(editCamp(state)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)(CampEdit);

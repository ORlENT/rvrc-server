import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { Header, SubmitButton, CenterBox, Field, Form, Select } from "../UI";
import { transferPt } from "../store/actions";

class PtTransfer extends Component {
  render() {
    return (
      <CenterBox>
        <Header>{this.props.myGroup} Station Master</Header>
        <Form
          admin
          onSubmit={this.props.transferPt}
          onSuccess={this.successHandler}
          history={this.props.history}
          groupname={this.props.myGroup}
        >
          <Select
            label="Attacking OG"
            id="groupname2"
            object={this.props.grpInfo}
          ></Select>
          <Field id="point" type="number">
            Points given to Attacking OG
          </Field>
          <SubmitButton>Transfer points</SubmitButton>
        </Form>
      </CenterBox>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    grpInfo: state.store.groups,
    myGroup: state.store.myGroup,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    transferPt: (state, props) => dispatch(transferPt(state, props)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)(PtTransfer);

import React, { Component } from "react";
import { connect } from "react-redux";

import { Header, SubmitButton, CenterBox, Field, Form, Select } from "../UI";
import { chooseAttacker, transferPt } from "../store/actions";

class PtTransfer extends Component {
  render() {
    return (
      <CenterBox>
        <Header>{this.props.myGroup} Station Master</Header>
        <Form
          admin
          onSubmit={this.props.chooseAttacker}
          groupname={this.props.myGroup}
        >
          <Select
            label="Attacking OG"
            id="groupname2"
            object={this.props.grpInfo}
          />
          <SubmitButton>Lock in Attacker</SubmitButton>
        </Form>
        <Form
          admin
          onSubmit={this.props.transferPt}
          groupname={this.props.myGroup}
          groupname2={this.props.attacker}
        >
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
  const grpInfo = state.store.groups;
  const myGroup = state.store.myGroup;
  var attacker = null;

  Object.keys(grpInfo).forEach((key) => {
    if (grpInfo[key].name == myGroup) {
      attacker = grpInfo[key].attacker;
    }
  });

  return {
    grpInfo: grpInfo,
    myGroup: myGroup,
    attacker: attacker,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    chooseAttacker: (state, props) => dispatch(chooseAttacker(state, props)),
    transferPt: (state, props) => dispatch(transferPt(state, props)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PtTransfer);

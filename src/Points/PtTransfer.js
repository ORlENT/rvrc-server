import React, { Component } from "react";
import { connect } from "react-redux";

import { Header, SubmitButton, CenterBox, Field, Form, Select } from "../UI";
import { chooseAttacker, clearAttacker, transferPt } from "../store/actions";

class PtTransfer extends Component {
  render() {
    const {
      myGroup,
      grpInfo,
      attacker,
      chooseAttacker,
      clearAttacker,
      transferPt,
    } = this.props;
    return (
      <CenterBox>
        <Header>{myGroup} Station Master</Header>

        {/* CHOOSING ATTACKER */}
        {attacker ? (
          //ATTACKER CHOSEN
          <Form admin onSubmit={clearAttacker} groupname={myGroup}>
            <Select label={attacker} disabled />
            <SubmitButton secondary>Clear Attacker</SubmitButton>
          </Form>
        ) : (
          //ATTACKER NOT YET CHOSEN
          <Form admin onSubmit={chooseAttacker} groupname={myGroup}>
            <Select label="Attacking OG" id="groupname2" object={grpInfo} />
            <SubmitButton>Lock in Attacker</SubmitButton>
          </Form>
        )}

        {/* TRANSFERRING POINTS */}
        {attacker ? (
          //ATTACKER CHOSEN
          <Form
            admin
            onSubmit={transferPt}
            onSuccess={clearAttacker}
            groupname={myGroup}
            groupname2={attacker}
          >
            <Field id="point" type="number">
              Points given to Attacking OG
            </Field>
            <SubmitButton>Transfer points</SubmitButton>
          </Form>
        ) : (
          //ATTACKER NOT YET CHOSEN
          <Form admin>
            <Field id="point" type="number" disabled>
              Points given to Attacking OG
            </Field>
            <SubmitButton disabled>Transfer points</SubmitButton>
          </Form>
        )}
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
    clearAttacker: (state, props) => dispatch(clearAttacker(state, props)),
    transferPt: (state, props) => dispatch(transferPt(state, props)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PtTransfer);

import React, { Component } from "react";
import { connect } from "react-redux";

import {
  Header,
  PtCard,
  SubmitButton,
  CenterBox,
  Field,
  Form,
  Select,
} from "../UI";
import { transferPt } from "../store/actions";

class TransEdit extends Component {
  render() {
    const { myGroup, groups, attacker, clearAttacker, transferPt } = this.props;
    return (
      <div>
        {/* CURRENT BATTLE */}
        <CenterBox>
          <Header>Current Battle</Header>
          <PtCard />
        </CenterBox>

        {/* EDIT FORM */}
        <CenterBox>
          <Header>Edit Battle</Header>

          <Form
            admin
            onSubmit={transferPt}
            onSuccess={clearAttacker}
            groupname={myGroup}
            groupname2={attacker}
          >
            <Select label="Attacking OG" id="groupname2" choices={groups} />
            <Field id="point" type="number">
              Points given to Attacking OG
            </Field>
            <SubmitButton>Transfer points</SubmitButton>
          </Form>
        </CenterBox>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const groups = Object.values(state.store.groups);
  const myGroup = state.store.myGroup;

  const transactions = state.store.transactions;
  const myTransactions = Object.values(transactions).filter(
    (t) => t.from === myGroup
  );

  return {
    groups: groups,
    myGroup: myGroup,
    myTransactions: myTransactions,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    transferPt: (state, props) => dispatch(transferPt(state, props)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TransEdit);

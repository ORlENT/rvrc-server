import React, { Component } from "react";
import { connect } from "react-redux";

import {
  Header,
  TransCard,
  SubmitButton,
  CenterBox,
  Field,
  Form,
  Select,
} from "../UI";
import { transferPt } from "../store/actions";

class TransEdit extends Component {
  render() {
    const {
      match,
      myGroup,
      groups,
      attacker,
      transactions,
      clearAttacker,
      transferPt,
    } = this.props;
    const t = transactions[match.params.id];

    if (!t) {
      return (
        <CenterBox>
          <Header>Battle not found</Header>
        </CenterBox>
      );
    }

    return (
      <div>
        {/* CURRENT BATTLE */}
        <CenterBox>
          <Header>Current Battle</Header>
          <TransCard key={t.id} id={t.id} t={t} />
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
            <Select
              label="Attacking OG"
              id="groupname2"
              value={t.to}
              choices={groups}
            />
            <Field id="point" type="number" value={t.points}>
              Points given to Attacking OG
            </Field>
            <SubmitButton>Confirm Edit</SubmitButton>
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

  return {
    groups: groups,
    myGroup: myGroup,
    transactions: transactions,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    transferPt: (state, props) => dispatch(transferPt(state, props)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TransEdit);

import React, { Component } from "react";
import { connect } from "react-redux";

import {
  Header,
  PtCard,
  TransCard,
  SubmitButton,
  CenterBox,
  Field,
  Form,
  Select,
} from "../UI";
import { chooseAttacker, clearAttacker, transferPt } from "../store/actions";

class PtTransfer extends Component {
  render() {
    const {
      myGroup,
      groups,
      chooseAttacker,
      clearAttacker,
      transferPt,
      myTransactions,
    } = this.props;
    return (
      <div>
        {/* STATION OVERVIEW */}
        <CenterBox>
          <Header>Current Status</Header>
          <PtCard
            title={myGroup.name}
            subtitle={myGroup.attacker ? "⚔️ by " + myGroup.attacker : ""}
            content={myGroup.points}
            highlight={"#ff9800"}
          />
        </CenterBox>

        <CenterBox>
          <Header>{myGroup.name} Station Master</Header>

          {/* CHOOSING ATTACKER */}
          {myGroup.attacker ? (
            //ATTACKER CHOSEN
            <Form admin onSubmit={clearAttacker} groupname={myGroup.name}>
              <Select label={myGroup.attacker} disabled />
              <SubmitButton secondary>Clear Attacker</SubmitButton>
            </Form>
          ) : (
            //ATTACKER NOT YET CHOSEN
            <Form admin onSubmit={chooseAttacker} groupname={myGroup.name}>
              <Select label="Attacking OG" id="groupname2" object={groups} />
              <SubmitButton>Lock in Attacker</SubmitButton>
            </Form>
          )}

          {/* TRANSFERRING POINTS */}
          {myGroup.attacker ? (
            //ATTACKER CHOSEN
            <Form
              admin
              onSubmit={transferPt}
              onSuccess={clearAttacker}
              groupname={myGroup.name}
              groupname2={myGroup.attacker}
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

        {/* TRANSACTIONS */}
        <CenterBox>
          <Header>{myGroup.name} Battles</Header>

          {/*No transactions found*/}
          {myTransactions.length === 0 && (
            <Header>No transactions found</Header>
          )}

          {/*Group List*/}
          {myTransactions && myTransactions.map((t) => <TransCard t={t} />)}
        </CenterBox>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const groups = state.store.groups;
  const myGroupName = state.store.myGroup;

  const myGroup = Object.values(groups).find((grp) => grp.name === myGroupName);

  const transactions = state.store.transactions;
  const myTransactions = Object.values(transactions).filter(
    (t) => t.from === myGroupName
  );

  return {
    groups: groups,
    myGroup: myGroup,
    myTransactions: myTransactions,
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

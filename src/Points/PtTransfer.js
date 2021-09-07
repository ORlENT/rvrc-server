import React, { Component } from "react";
import { connect } from "react-redux";

import {
  Header,
  PtCard,
  TransCard,
  SubmitButton,
  CenterBox,
  Form,
  Select,
} from "../UI";
import { chooseAttacker, clearAttacker, addPt } from "../store/actions";
import ValidationError from "../errors/ValidationError";

class PtTransfer extends Component {
  validate = (state) => {
    if (!state.groupname2) {
      throw new ValidationError(
        "groupname2",
        "Please select an Attacking OG to force an attack"
      );
    }
  };

  render() {
    const {
      myGroup,
      groups,
      chooseAttacker,
      clearAttacker,
      addPt,
      myTransactions,
    } = this.props;
    return (
      <div>
        {/* STATION OVERVIEW */}
        <CenterBox>
          <Header>Current Status</Header>
          <PtCard
            key={myGroup.name}
            title={myGroup.name}
            subtitle={
              myGroup.damaged
                ? myGroup.attacker
                  ? "🛠️ by " + myGroup.attacker
                  : "🤕"
                : myGroup.attacker
                ? "⚔️ by " + myGroup.attacker
                : ""
            }
            content={myGroup.points}
            link={null}
            color={myGroup.color}
            isMine={false}
            clickable={false}
          />
        </CenterBox>

        <CenterBox>
          <Header>{myGroup.name} Station Master</Header>

          {/* CHOOSING ATTACKER */}
          {myGroup.attacker ? (
            //ATTACKER CHOSEN
            <Form admin onSubmit={clearAttacker} groupname={myGroup.name}>
              <Select
                label={myGroup.attacker}
                disabled
                choices={groups}
              ></Select>
              <SubmitButton secondary>Force Clear Attacker</SubmitButton>
            </Form>
          ) : (
            //ATTACKER NOT YET CHOSEN
            <Form
              admin
              onSubmit={chooseAttacker}
              validate={this.validate}
              groupname={myGroup.name}
            >
              <Select label="Attacking OG" id="groupname2" choices={groups} />
              <SubmitButton>Force Lock in Attacker</SubmitButton>
            </Form>
          )}

          {/* TRANSFERRING POINTS */}
          {myGroup.attacker ? (
            //ATTACKER CHOSEN
            <Form
              admin
              onSubmit={addPt}
              onSuccess={clearAttacker}
              point={1}
              groupname={myGroup.name}
              groupname2={myGroup.attacker}
            >
              <SubmitButton success>Win</SubmitButton>
            </Form>
          ) : (
            //ATTACKER NOT YET CHOSEN
            <SubmitButton disabled>Win</SubmitButton>
          )}
          {myGroup.attacker ? (
            //ATTACKER CHOSEN
            <Form
              admin
              onSubmit={addPt}
              onSuccess={clearAttacker}
              point={0}
              groupname={myGroup.name}
              groupname2={myGroup.attacker}
            >
              <SubmitButton error>Lose</SubmitButton>
            </Form>
          ) : (
            //ATTACKER NOT YET CHOSEN
            <SubmitButton disabled>Lose</SubmitButton>
          )}
        </CenterBox>

        {/* TRANSACTIONS */}
        <CenterBox>
          <Header>{myGroup.name} Battles</Header>

          {/*No transactions found*/}
          {myTransactions.length === 0 && (
            <Header>No transactions found</Header>
          )}

          {/*Transaction List*/}
          {myTransactions &&
            myTransactions.map((t) => <TransCard key={t.id} id={t.id} t={t} />)}
        </CenterBox>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const isOG = (grp) => grp.points || grp.points === 0;

  var groups = Object.values(state.store.groups);
  const myGroupName = state.store.myGroup;

  const myGroup = groups.find((grp) => grp.name === myGroupName);
  /* groups = groups
    .filter((grp) => isOG(grp))
    .filter((grp) => grp.name !== myGroupName); */
  groups = groups.filter((grp) => isOG(grp));

  const transactions = state.store.transactions;
  const myTransactions = Object.entries(transactions)
    .map((kv) => {
      const t = kv[1];
      t.id = kv[0];
      return t;
    })
    .filter((t) => t.from === myGroupName);

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
    addPt: (state, props) => dispatch(addPt(state, props)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PtTransfer);

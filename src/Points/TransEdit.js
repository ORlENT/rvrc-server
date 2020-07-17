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
  state = {};

  componentDidMount() {
    const newT = this.props.transactions[this.props.match.params.id];
    this.setState({
      groupname2: newT.to,
      point: newT.points,
    });
  }

  handleChange = (e) => {
    console.log("BOOMZ");
    this.setState({
      [e.target.id ? e.target.id : e.target.name]: e.target.value,
    });
  };

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
          <Header>Preview</Header>
          <TransCard
            key={t.id}
            id={t.id}
            t={t}
            newT={{
              from: t.from,
              to: this.state.groupname2,
              points: this.state.point,
              timestamp: t.timestamp,
            }}
          />
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
              onChange={this.handleChange}
            />
            <Field
              id="point"
              type="number"
              value={t.points}
              onChange={this.handleChange}
            >
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
  var groups = Object.values(state.store.groups);
  const myGroup = state.store.myGroup;
  groups = groups.filter((grp) => grp.name !== myGroup);

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

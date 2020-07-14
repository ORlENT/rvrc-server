import React, { Component } from "react";
import { connect } from "react-redux";
import { Header, CenterBox, PtCard, NavButton } from "../UI";

class PtList extends Component {
  render() {
    let { grpInfo, transactions, isAuthed } = this.props;
    return (
      <div>
        {/* GROUPS */}
        <CenterBox>
          <Header>Leaderboard</Header>

          {/*No groups found*/}
          {Object.keys(grpInfo).length === 0 && (
            <Header>No groups found</Header>
          )}

          {/*Transfer points button (Admin only)*/}
          {isAuthed && (
            <NavButton admin to={`/transfer`}>
              Transfer points
            </NavButton>
          )}

          {/*Group List*/}
          {grpInfo &&
            Object.keys(grpInfo).map((key) => (
              <PtCard
                key={key}
                title={grpInfo[key].name}
                subtitle={
                  grpInfo[key].attacker ? "⚔️ by " + grpInfo[key].attacker : ""
                }
                content={grpInfo[key].points}
                highlight={"#ff9800"}
              />
            ))}
        </CenterBox>

        {/* TRANSACTIONS */}
        <CenterBox>
          <Header>Battles</Header>

          {/*No transactions found*/}
          {Object.keys(transactions).length === 0 && (
            <Header>No transactions found</Header>
          )}

          {/*Group List*/}
          {transactions &&
            Object.keys(transactions).map((key) => (
              <PtCard
                key={key}
                subtitle={
                  transactions[key].from + " ⚔️ by " + transactions[key].to
                }
                content={transactions[key].points}
              />
            ))}
        </CenterBox>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    grpInfo: state.store.groups,
    transactions: state.store.transactions,
    //isAuthed: state.store.isAuthed,
  };
};

export default connect(mapStateToProps)(PtList);

import React, { Component } from "react";
import { connect } from "react-redux";
import { Header, CenterBox, PtCard, NavButton } from "../UI";

class PtList extends Component {
  render() {
    let { groups, transactions, isAuthed } = this.props;
    return (
      <div>
        {/* GROUPS */}
        <CenterBox>
          <Header>Leaderboard</Header>

          {/*No groups found*/}
          {groups.length === 0 && <Header>No groups found</Header>}

          {/*Transfer points button (Admin only)*/}
          {isAuthed && (
            <NavButton admin to={`/transfer`}>
              Transfer points
            </NavButton>
          )}

          {/*Group List*/}
          {groups &&
            groups.map((grp) => (
              <PtCard
                title={grp.name}
                subtitle={grp.attacker ? "⚔️ by " + grp.attacker : ""}
                content={grp.points}
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
  const groups = Object.values(state.store.groups).sort((a, b) => {
    if (a.points === b.points) {
      return a.name - b.name;
    }
    return b.points - a.points;
  });

  return {
    groups: groups,
    transactions: state.store.transactions,
    //isAuthed: state.store.isAuthed,
  };
};

export default connect(mapStateToProps)(PtList);

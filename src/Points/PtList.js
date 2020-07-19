import React, { Component } from "react";
import { connect } from "react-redux";
import { Header, CenterBox, PtCard, TransCard, NavButton } from "../UI";

class PtList extends Component {
  render() {
    let { ogs, rcs, transactions, isAuthed } = this.props;
    return (
      <div>
        {/* OGs */}
        <CenterBox>
          <Header>Leaderboard</Header>

          {/*No OGs found*/}
          {ogs.length === 0 && <Header>No OGs found</Header>}

          {/*Transfer points button (Admin only)*/}
          {isAuthed && (
            <NavButton admin to={`/transfer`}>
              Transfer points
            </NavButton>
          )}

          {/*Group List*/}
          {ogs &&
            ogs.map((og) => (
              <PtCard
                key={og.name}
                title={og.name}
                subtitle={og.attacker ? "⚔️ by " + og.attacker : ""}
                content={og.points}
              />
            ))}
        </CenterBox>

        {/* RESOURCE CAMPS */}
        <CenterBox>
          <Header>Resource Camps</Header>

          {/*No RCs found*/}
          {rcs.length === 0 && <Header>No camps found</Header>}

          {/*RC List*/}
          {rcs &&
            rcs.map((rc) => (
              <PtCard
                key={rc.name}
                title={rc.name}
                subtitle={rc.attacker ? "⚔️ by " + rc.attacker : ""}
                content={rc.points}
              />
            ))}
        </CenterBox>

        {/* TRANSACTIONS */}
        <CenterBox>
          <Header>Battles</Header>

          {/*No transactions found*/}
          {Object.keys(transactions).length === 0 && (
            <Header>No Battles found</Header>
          )}

          {/*Transaction List*/}
          {transactions &&
            Object.keys(transactions).map((key) => {
              return <TransCard key={key} id={key} t={transactions[key]} />;
            })}
        </CenterBox>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const groups = Object.values(state.store.groups);

  const isOG = (grp) => grp.points || grp.points === 0;

  const ogs = groups
    .filter((grp) => isOG(grp))
    .sort((a, b) => {
      if (a.points === b.points) {
        return a.name - b.name;
      }
      return b.points - a.points;
    });

  const rcs = groups
    .filter((grp) => !isOG(grp))
    .sort((a, b) => a.name - b.name);

  return {
    ogs: ogs,
    rcs: rcs,
    transactions: state.store.transactions,
    //isAuthed: state.store.isAuthed,
  };
};

export default connect(mapStateToProps)(PtList);

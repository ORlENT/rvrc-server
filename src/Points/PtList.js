import React, { Component } from "react";
import { connect } from "react-redux";
import { chooseAttacker, resetForm } from "../store/actions";
import { Header, SideBox, PtCard, NavButton, LoadingScreen } from "../UI";
import { Grid } from "@material-ui/core";
import ShipDisplay from "../UI/ShipDisplay";

class PtList extends Component {
  state = {
    loading: false,
    errorText: {},
    targetLink: null,
  };

  componentDidUpdate() {
    try {
      if (this.props.formSuccess) {
        this.props.resetForm();
        this.setState({
          loading: false,
        });
        if (this.state.targetLink != null)
          window.open(this.state.targetLink, "_blank");
      }

      if (this.props.formFailed) {
        this.props.resetForm();
        this.setState({
          loading: false,
        });
        // popup that you have failed
      }
    } catch (err) {
      //console.log(err);
      this.setState({
        errorText: { [err.id]: err.message },
      });
    }
  }

  render() {
    let {
      ogs,
      isAuthed,
      myGroup,
      houses,
      houseDamaged,
      chooseAttacker,
      message,
    } = this.props;

    console.log(houses);

    const rowOfShips = (a, b) => (
      <Grid container spacing={3} justify="center">
        {houses.slice(a, b).map((house) => (
          <Grid item key={house[0]}>
            <ShipDisplay
              image={"ships/" + house[0] + ".png"}
              width={house[1].length === 4 ? 230 : 180}
            >
              <Grid container spacing={1} justify="center">
                {house[1].map((og) => (
                  <Grid item key={og.name}>
                    <PtCard
                      title={
                        og.damaged
                          ? og.attacker
                            ? "🛠️"
                            : "🤕"
                          : og.attacker
                          ? "⚔️"
                          : og.name.substring(0, 2)
                      }
                      subtitle=""
                      content=""
                      link={og.link}
                      color={og.color}
                      isMine={og.name === myGroup.name}
                      clickable={og.clickable}
                      onClickHandler={
                        og.attacker
                          ? () => window.open(og.link, "_blank")
                          : () => {
                              this.setState({
                                loading: true,
                                targetLink: og.link,
                              });
                              chooseAttacker(
                                { groupname2: myGroup.name },
                                { groupname: og.name }
                              );
                            }
                      }
                    />
                  </Grid>
                ))}
              </Grid>
            </ShipDisplay>
          </Grid>
        ))}
      </Grid>
    );

    return (
      <div>
        {/* Loading Screen */}
        {this.state.loading ? <LoadingScreen /> : null}

        <Grid container spacing={0}>
          <Grid item xs>
            {/* Ship Display */}
            <div
              className="centerContent"
              style={{
                position: "fixed",
                top: "0",
                width: "80%",
                height: "100%",
                zIndex: "0",
              }}
            >
              {rowOfShips(0, 3)}
              <Header
                style={{
                  color: "#444",
                }}
              >
                {message}
              </Header>
              {rowOfShips(3, 7)}
            </div>
          </Grid>

          <Grid item xs>
            {/* OGs */}
            <SideBox>
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
                    subtitle={
                      og.damaged
                        ? og.attacker
                          ? "🛠️ by " + og.attacker
                          : "🤕"
                        : og.attacker
                        ? "⚔️ by " + og.attacker
                        : ""
                    }
                    content={og.points}
                    link={og.link}
                    color={og.color}
                    isMine={og.name === myGroup.name}
                    clickable={og.clickable}
                    onClickHandler={
                      og.attacker
                        ? () => window.open(og.link, "_blank")
                        : () => {
                            this.setState({
                              loading: true,
                              targetLink: og.link,
                            });
                            chooseAttacker(
                              { groupname2: myGroup.name },
                              { groupname: og.name }
                            );
                          }
                    }
                  />
                ))}
            </SideBox>
          </Grid>
        </Grid>
        {houseDamaged ? (
          <img
            src="damaged.png"
            alt="owie im hurt"
            class="blinking"
            style={{
              content: "",
              position: "fixed",
              height: "100%",
              width: "100%",
              left: 0,
              top: 0,
              zIndex: 100000,
              pointerEvents: "none",
            }}
          />
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  var message = "⚔️ Click an OG to attack them! ⚔️";
  const groups = Object.values(state.store.groups);
  const myGroupName = state.store.myGroup;

  const myGroup = groups.find((grp) => grp.name === myGroupName);

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

  var groupBy = function (xs, key) {
    return xs.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };

  const houses = Object.entries(groupBy(groups, "color"));
  const houseDamaged = groups.filter(
    (grp) => grp.color === myGroup.color && grp.damaged && !grp.attacker
  );

  // settle clickables
  const attackedByMe = groups.find((grp) => grp.attacker === myGroupName);
  if (attackedByMe != null) {
    // if my og is attacking, can only attack the same og as them
    groups.forEach((grp) => {
      if (grp === attackedByMe) {
        grp.clickable = true;
      } else {
        grp.clickable = false;
      }
    });
    if (attackedByMe.color === myGroup.color) {
      message =
        "🛠️ Your OG is repairing " +
        attackedByMe.name +
        ", click them to help out! 🛠️";
    } else {
      message =
        "⚔️ Your OG is attacking " +
        attackedByMe.name +
        ", click them to join the fight! ⚔️";
    }
  } else {
    // can only defend my own house when they are damaged and no one is defending

    if (houseDamaged.length !== 0) {
      groups.forEach((grp) => (grp.clickable = false));
      houseDamaged.forEach((grp) => (grp.clickable = true));
      message =
        "🤕 Your ship is damaged! Click on a friendly OG to help them! 🤕";
    } else {
      // cannot attack og that is attacked by other og
      // cannot attack damaged ogs
      // cannot attack own house unless damaged
      groups.forEach((grp) => {
        if (grp.attacker || grp.damaged || grp.color === myGroup.color) {
          grp.clickable = false;
        } else {
          grp.clickable = true;
        }
      });
    }
  }

  return {
    ...state,
    message: message,
    ogs: ogs,
    rcs: rcs,
    myGroup: myGroup,
    houses: houses,
    houseDamaged: attackedByMe == null && houseDamaged.length !== 0,
    transactions: state.store.transactions,
    formSuccess: state.store.formSuccess,
    formFailed: state.store.formFailed,
    //isAuthed: state.store.isAuthed,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    chooseAttacker: (state, props) => dispatch(chooseAttacker(state, props)),
    resetForm: () => dispatch(resetForm()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PtList);

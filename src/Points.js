import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

import AdminRoute from "./Routes/AdminRoute";
import PtList from "./Points/PtList";
import PtTransfer from "./Points/PtTransfer";
import { NavBar, LoadingScreen } from "./UI";
import { fetchInfo } from "./store/actions";

class Point extends Component {
  componentDidMount() {
    this.props.fetchInfo();
  }

  render() {
    const { loaded } = this.props;

    //Firestore loading
    if (!loaded) {
      return <LoadingScreen />;
    }

    //Render
    return (
      <div
        style={{
          display: "grid",
          minHeight: "100%",
        }}
      >
        {/*Layer 1: NavBar*/}
        <div
          style={{
            gridColumn: "1",
            gridRow: "1",
            zIndex: "1",
            height: "60px",
            position: "sticky",
            top: "0",
          }}
        >
          <NavBar />
        </div>

        {/*Layer 2: Page content */}
        <div
          style={{
            gridColumn: "1",
            gridRow: "1",
            zIndex: "0",
            paddingTop: "60px",
          }}
        >
          <Switch>
            <Route exact path={"/"} component={PtList} />
            <AdminRoute
              path={"/transfer"}
              redirect={"/"}
              component={PtTransfer}
            />
          </Switch>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loaded: state.store.loaded,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchInfo: () => dispatch(fetchInfo()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Point);

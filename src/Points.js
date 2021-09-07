import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

import AdminRoute from "./Routes/AdminRoute";
import UserRoute from "./Routes/UserRoute";
import PtList from "./Points/PtList";
import PtTransfer from "./Points/PtTransfer";
import { LoadingScreen } from "./UI";
import { fetchInfo } from "./store/actions";
import AdminLogin from "./UI/AdminLogin";
import UserLogin from "./UI/UserLogin";

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
      <div>
        <Switch>
          <Route exact path={"/login"} component={UserLogin} />
          <UserRoute exact path={"/"} redirect={"/login"} component={PtList} />
          <Route exact path={"/admin"} component={AdminLogin} />
          <AdminRoute
            path={"/transfer"}
            redirect={"/admin"}
            component={PtTransfer}
          />
        </Switch>
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

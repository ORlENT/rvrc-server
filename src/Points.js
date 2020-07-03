import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

import AdminRoute from "./Routes/AdminRoute";
import PtList from "./Points/PtList";
import PtAdd from "./Points/PtAdd";
import PtTransfer from "./Points/PtTransfer";
import { fetchInfo } from "./store/actions";

class Point extends Component {
  componentDidMount() {
    this.props.fetchInfo();
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    console.log("Route Changed");
    this.props.fetchInfo();
  }

  render() {
    return (
      <Switch>
        <Route exact path={"/"} component={PtList} />
        <Route path={"/transfer"} component={PtTransfer} />
        <AdminRoute path={"/:grpID/ptAdd"} redirect={"/"} component={PtAdd} />
      </Switch>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchInfo: () => dispatch(fetchInfo()),
  };
};

export default connect(null, mapDispatchToProps)(Point);

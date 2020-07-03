import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import AdminRoute from "../../Routes/AdminRoute";
import PtList from "./Points/PtList";
import GrpDetails from "./Points/GrpDetails";
import GrpCreate from "./Points/GrpCreate";
import PtAdd from "./Points/PtAdd";
import PtTransfer from "./Points/PtTransfer";

class Point extends Component {
  render() {
    const { match } = this.props;
    return (
      <Switch>
        <Route exact path={`${match.path}`} component={PtList} />
        <Route path={`${match.path}/create`} component={GrpCreate} />
        <Route path={`${match.path}/transfer`} component={PtTransfer} />
        <Route exact path={`${match.path}/:grpID`} component={GrpDetails} />
        <AdminRoute
          path={`${match.path}/:grpID/ptAdd`}
          redirect={`${match.url}`}
          component={PtAdd}
        />
      </Switch>
    );
  }
}

export default Point;

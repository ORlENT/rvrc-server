import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import Camp from "./Pages/Camp.js";
import CreateCamp from "./Pages/CreateCamp.js";
import Home from "./Pages/Home.js";
import JoinCamp from "./Pages/JoinCamp.js";

class Pages extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/join" component={JoinCamp} />
        <Route path="/create" component={CreateCamp} />
        <Route path="/camp/:campCode" component={Camp} />
      </Switch>
    );
  }
}

export default Pages;

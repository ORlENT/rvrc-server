import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const UserRoute = ({
  component: Component,
  redirect,
  groupChosen,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        groupChosen ? <Component {...props} /> : <Redirect to={redirect} />
      }
    />
  );
};

const mapStateToProps = (state) => {
  return {
    groupChosen: state.store.groupChosen,
  };
};

export default connect(mapStateToProps)(UserRoute);

import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const AdminRoute = ({ component: Component, redirect, isAuthed, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthed ? <Component {...props} /> : <Redirect to={redirect} />
      }
    />
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthed: state.store.isAuthed,
  };
};

export default connect(mapStateToProps)(AdminRoute);

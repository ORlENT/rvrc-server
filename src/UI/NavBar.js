import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Button, IconButton } from "@material-ui/core";
import withWidth, { isWidthDown } from "@material-ui/core/withWidth";
import { AccountCircle } from "@material-ui/icons";
import AdminLogin from "./AdminLogin";
import { signOut } from "../store/actions";

class NavBar extends Component {
  state = {
    visible: false,
  };

  toggleVisibility = () => {
    this.setState({
      visible: !this.state.visible,
    });
  };

  /* componentDidUpdate() {
    if (this.props.isAuthed && this.state.visible) {
      this.setState({
        visible: false,
      });
    }
  } */

  render() {
    const { width, isAuthed, signOut } = this.props;
    return (
      <div
        style={{
          display: "grid",
          position: "sticky",
          top: "0",
        }}
      >
        {/*Navbar*/}
        <div
          style={{
            gridColumn: "1",
            gridRow: "1",
            display: "grid",
            height: "60px",
          }}
        >
          {/*Admin login button*/}
          {isWidthDown("xs", width) ? (
            //MOBILE VERSION
            <IconButton
              color="secondary"
              style={{
                gridColumn: "1",
                gridRow: "1",
                justifySelf: "end",
                zIndex: "1",
                width: "60px",
              }}
              onClick={() => (isAuthed ? signOut() : this.toggleVisibility())}
            >
              <AccountCircle />
            </IconButton>
          ) : (
            //WEB VERSION
            <Button
              color="secondary"
              style={{
                gridColumn: "1",
                gridRow: "1",
                justifySelf: "end",
                zIndex: "1",
                width: "150px",
              }}
              onClick={() => (isAuthed ? signOut() : this.toggleVisibility())}
            >
              {isAuthed ? "Logout" : "Login as admin"}
            </Button>
          )}

          {/*Title and Background*/}
          <div
            className="centerContent"
            style={{
              gridColumn: "1",
              gridRow: "1",
              backgroundColor: "#222",
            }}
          >
            <h2 style={{ color: "#fff", textAlign: "center", margin: "0px" }}>
              War Games
            </h2>
          </div>
        </div>

        {/*Admin login*/}
        {this.state.visible && (
          <div
            style={{
              gridColumn: "1",
              gridRow: "1",
              zIndex: "2",
            }}
          >
            <AdminLogin toggleVisibility={this.toggleVisibility} />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    camp: state.store.camp,
    isAuthed: state.store.isAuthed,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut()),
  };
};

export default compose(
  withWidth(),
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(NavBar);

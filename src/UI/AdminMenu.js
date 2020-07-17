import React, { Component } from "react";
import { Menu, MenuItem, IconButton } from "@material-ui/core";
import { Settings } from "@material-ui/icons";
import { connect } from "react-redux";
import { dispatchType } from "../store/actions";

class AdminMenu extends Component {
  state = {
    anchorEl: null,
    callbackAction: false,
  };

  handleClick = (event) => {
    this.setState({
      anchorEl: event.currentTarget,
    });
  };

  handleClose = () => {
    this.setState({
      anchorEl: null,
    });
  };

  handleOption = (option) => {
    this.handleClose();
    option.handler();
  };

  componentDidUpdate() {
    try {
      if (this.state.callbackAction && this.props.confirm) {
        this.state.callbackAction();
        this.setState({
          callbackAction: null,
        });
        this.props.dispatchType("CONFIRM_FORM_CLOSE");
      }
      if (this.state.callbackAction && this.props.clearAction) {
        this.setState({
          callbackAction: null,
        });
        this.props.dispatchType("CONFIRM_FORM_CLEARED_CALLBACKACTION");
      }
    } catch (err) {
      //console.log(err);
    }
  }

  render() {
    const { menuOptions, ...rest } = this.props;
    const { anchorEl } = this.state;
    return (
      <div {...rest}>
        <IconButton
          color="secondary"
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <Settings fontSize="small" />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          {menuOptions.map((option) => {
            if (option.name === "Delete")
              return (
                <div>
                  <MenuItem
                    key={option.name}
                    onClick={() => {
                      this.handleClose();
                      this.setState({
                        callbackAction: () => {
                          this.handleOption(option);
                        },
                      });
                      this.props.dispatchType("CONFIRM_FORM_OPEN");
                    }}
                  >
                    {option.name}
                  </MenuItem>
                </div>
              );
            return (
              <MenuItem
                key={option.name}
                onClick={() => {
                  this.handleOption(option);
                }}
              >
                {option.name}
              </MenuItem>
            );
          })}
        </Menu>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state,
    confirm: state.store.confirm,
    clearAction: state.store.clearAction,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchType: (type) => dispatch(dispatchType(type)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminMenu);

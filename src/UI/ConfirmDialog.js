import React, { Component } from "react";
import { Header, SubmitButton, CenterBox } from ".";
import { connect } from "react-redux";

import { withRouter } from "react-router-dom";
import { compose } from "redux";
import { fetchInfo, dispatchType } from "../store/actions";

class ConfirmDialog extends Component {
  state = {
    visible: false,
  };

  componentDidUpdate() {
    try {
      if (!this.state.visible && this.props.confirmForm) {
        this.setState({
          visible: true,
        });
      }

      if (this.state.visible && !this.props.confirmForm) {
        this.setState({
          visible: false,
        });
        this.props.fetchInfo(this.props.match.params.campCode);
      }
    } catch (err) {
      console.log(err);
      this.setState({
        errorText: { [err.id]: err.message },
      });
    }
  }

  render() {
    return (
      <React.Fragment>
        <div
          style={{
            display: "grid",
            position: "sticky",
            top: "0",
          }}
        >
          <div
            style={{
              gridColumn: "1",
              gridRow: "1",
              zIndex: "0",
              height: "100vh",
            }}
          >
            {this.props.children}
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
              <div
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  height: "100vh",
                  zIndex: "2",
                }}
              >
                <CenterBox>
                  <Header>Confirm {this.props.actionText}?</Header>
                  <SubmitButton
                    admin={this.props.admin}
                    onClick={() => {
                      if (this.props.action) {
                        this.props.action();
                      } else {
                        this.props.dispatchType("CONFIRMFORM_CONFIRM");
                      }
                    }}
                  >
                    {this.props.actionText}
                  </SubmitButton>
                  <SubmitButton
                    secondary
                    admin={this.props.admin}
                    onClick={() => {
                      this.props.dispatchType("CONFIRM_FORM_CLOSE");
                    }}
                  >
                    Back
                  </SubmitButton>
                </CenterBox>
              </div>
            </div>
          )}
        </div>
      </React.Fragment>
    );
  }
}

ConfirmDialog.defaultProps = {
  closeConfirmForm: () => null,
  setCallback: () => null,
};

const mapStateToProps = (state) => {
  return {
    ...state,
    confirmForm: state.store.confirmForm,
    clearAction: state.store.clearAction,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchInfo: (campCode) => dispatch(fetchInfo(campCode)),
    dispatchType: (type) => dispatch(dispatchType(type)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)(ConfirmDialog);

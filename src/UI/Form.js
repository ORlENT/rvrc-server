import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";
import Field from "./Field";
import Select from "./Select";
import { LoadingScreenSmall } from "./LoadingScreen";
import { resetForm } from "../store/actions";

/* 
Form Wrapper Component

@props
onSubmit(state, props):   action for submitting the form
validate(state, props):   throws ValidationError for bad input before submission
onSuccess(state, props):  what to do when the submission is successful
onFail(state, props):     throws ValidationError for bad input after submission
 */

class Form extends Component {
  state = {
    loading: false,
    errorText: {},
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id ? e.target.id : e.target.name]: e.target.value,
    });
  };

  handleBlur = (e) => {
    try {
      this.props.validate(this.state, this.props);
      this.setState({
        errorText: {},
      });
    } catch (err) {
      console.log(err);
      this.setState({
        errorText: { [err.id]: err.message },
      });
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    try {
      this.props.validate(this.state, this.props);
      this.props.onSubmit(this.state, this.props);
      this.setState({
        loading: true,
      });
    } catch (err) {
      console.log(err);
      this.setState({
        errorText: { [err.id]: err.message },
      });
    }
  };

  componentDidMount() {
    this.props.children.map(
      (child) =>
        child.props.id &&
        this.setState({
          [child.props.id]: child.props.value,
        })
    );
  }

  componentDidUpdate() {
    try {
      if (this.props.formSuccess) {
        this.props.resetForm();
        this.setState({
          loading: false,
        });
        this.props.onSuccess(this.state, this.props);
      }

      if (this.props.formFailed) {
        this.props.resetForm();
        this.setState({
          loading: false,
        });
        this.props.onFail(this.state, this.props);
      }
    } catch (err) {
      console.log(err);
      this.setState({
        errorText: { [err.id]: err.message },
      });
    }
  }

  render() {
    const { admin, children } = this.props;
    return (
      <div
        style={{
          display: "grid",
        }}
      >
        {/* Loading Screen */}
        {this.state.loading ? (
          <LoadingScreenSmall
            style={{
              gridColumn: "1",
              gridRow: "1",
              zIndex: "1",
            }}
          />
        ) : null}

        {/* Form */}
        <form
          onSubmit={this.handleSubmit}
          style={{
            gridColumn: "1",
            gridRow: "1",
          }}
        >
          <Grid container spacing={2}>
            {React.Children.map(children, (child) => (
              <Grid item style={{ width: "100%" }}>
                {child.type === Field || child.type === Select
                  ? //Fields
                    React.cloneElement(child, {
                      onChange: this.handleChange,
                      onBlur: this.handleBlur,
                      errorText: this.state.errorText[child.props.id],
                      value: this.state[child.props.id] || "",
                      admin,
                    })
                  : //Buttons
                    React.cloneElement(child, { admin })}
              </Grid>
            ))}
          </Grid>
        </form>
      </div>
    );
  }
}

Form.defaultProps = {
  onSubmit: () => null,
  validate: () => null,
  onSuccess: () => null,
  onFail: () => null,
};

const mapStateToProps = (state) => {
  return {
    ...state,
    formSuccess: state.store.formSuccess,
    formFailed: state.store.formFailed,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    resetForm: () => dispatch(resetForm()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);

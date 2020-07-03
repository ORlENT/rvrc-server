import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Header, SubmitButton, CenterBox, Field, Form } from "../UI";

class JoinCamp extends Component {
  handleSubmit(state, props) {
    props.history.push("/camp/" + state.campCode);
  }

  render() {
    return (
      <CenterBox>
        <Header>Join Camp</Header>
        <Form onSubmit={this.handleSubmit} history={this.props.history}>
          <Field id="campCode">Camp Code</Field>
          <SubmitButton>Join Camp</SubmitButton>
        </Form>
      </CenterBox>
    );
  }
}

export default withRouter(JoinCamp);

import React, { Component } from "react";
import { createForm } from "rc-form";

@createForm()
class RCForm extends Component {
  render() {
    console.log(this.props);

    return (
      <div>
        <form>
          <input placeholder="username" />
        </form>
      </div>
    );
  }
}
export default RCForm;

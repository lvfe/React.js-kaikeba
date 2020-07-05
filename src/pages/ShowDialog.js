import React, { Component } from "react";
import PropTypes from "prop-types";

export default class ShowDialog extends Component {
  render() {
    return (
      <div>
        <button>show dialog</button>
        {this.state.show && <Dialog></Dialog>} //传送门
      </div>
    );
  }
}

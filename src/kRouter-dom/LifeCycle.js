import React, { Component } from "react";

export default class LifeCycle extends Component {
  componentDidMount() {
    if (this.props.onMount) {
      this.props.onMount.call(this, this);
    }
  }
  componentWillUnmount() {
    this.props.onUnmout.call(this, this);
  }

  render() {
    return <div></div>;
  }
}

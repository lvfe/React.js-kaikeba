import React, { Component } from "react";
import RouterContext from "./Context";

export default class Link extends Component {
  static contextType = RouterContext;
  handleClick = (e) => {
    e.preventDefault();
    console.log("Link history", this.context);

    this.context.history.push(this.props.to);
  };
  render() {
    const { to, children, ...restProps } = this.props;
    return (
      <a href={to} onClick={this.handleClick}>
        {children}
      </a>
    );
  }
}

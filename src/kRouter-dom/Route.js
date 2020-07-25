import React, { Component } from "react";
import RouterContext from "./Context";

export default class Route extends Component {
  render() {
    return (
      <RouterContext.Consumer>
        {(context) => {
          const { location } = context;
          const { children, render, component, path } = this.props;
          const match = location.pathname === path;
          const props = {
            ...context,
            location,
            match,
          };
          {
            return match
              ? children
                ? typeof children === "function"
                  ? children(props)
                  : children
                : component
                ? React.createElement(component, props)
                : render
                ? render(props)
                : null
              : typeof children === "function"
              ? children(props)
              : null;
          }
          // return match?(children?(typeof children=='function'?children(props):children):(component?(React.createElement(component, props)):(render?render(props):null)))
        }}
      </RouterContext.Consumer>
    );
  }
}

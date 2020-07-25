import React, { Component } from "react";
import RouterContext from "./Context";

export default class Router extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: props.history.location,
    };
    props.history.listen((location) => {
      this.setState({ location });
    });
  }
  render() {
    const { history, children } = this.props;
    const { location } = this.state;
    console.log(22222, location);

    return (
      <RouterContext.Provider value={{ history, location }}>
        {children}
      </RouterContext.Provider>
    ); // children已经是compnnets
  }
}

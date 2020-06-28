import React, { Component } from "react";
import PropTypes from "prop-types";
import { ThemeConsumer } from "../Context";

export default class ConsumerPage extends Component {
  render() {
    return (
      <div>
        <ThemeConsumer>
          {(context) => <div>testing - {context.themeColor}</div>}
        </ThemeConsumer>
      </div>
    );
  }
}

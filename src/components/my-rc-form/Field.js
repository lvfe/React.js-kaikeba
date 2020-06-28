import React, { Component } from "react";
import FieldContext from "./FieldContext";

export default class Field extends Component {
  static contextType = FieldContext;

  getControls() {
    const { name } = this.props;
    console.log("context", this.context);
    return {
      value: this.context.getFieldValue(name),
      onChange: (e) => {
        console.log("event value", e.target.value);
        this.context.setFieldsValue({ name: e.target.value });
      },
    };
  }
  render() {
    const { children, name } = this.props;
    const childNode = React.cloneElement(children, this.getControls());
    return childNode;
  }
}

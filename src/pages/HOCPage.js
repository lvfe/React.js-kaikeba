import React, { Component } from "react";
const foo = (Comp) => (props) => {
  return (
    <div className="border">
      <Comp {...props} />
    </div>
  );
};
const Child = (props) => <div>child {props.name}</div>;
const Foo = foo(foo(Child));
export default class HOCPage extends Component {
  render() {
    return (
      <div>
        <h3>HOCPage</h3>
        <Foo name="msg"></Foo>
      </div>
    );
  }
}

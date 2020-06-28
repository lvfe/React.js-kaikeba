import React, { Component } from "react";

const foo = (Comp) => (props) => {
  return (
    <div className="border">
      <Comp {...props} />
    </div>
  );
};
// function Child(props) {
//   return <div>chillld -- {props.name}</div>;
// }
// const Foo = foo(foo(Child));
@foo
@foo
class Child extends Component {
  render() {
    return <div>Child - {this.props.name}</div>;
  }
}

export default class DecoratetPage extends Component {
  render() {
    return (
      <div>
        <h3>Descroator Page</h3>
        <Child name="Child" />
      </div>
    );
  }
}

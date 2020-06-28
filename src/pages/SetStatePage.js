import React, { Component } from "react";
class SetStateComponent extends Component {
  constructor(props) {
    super(props);

    this.state = { counter: 0 };
  }
  componentDidMount() {
    // setTimeout(() => {
    // document.body.addEventListener('click');
    this.changeValue(1);
    // }, 0);
  }
  setCounter = () => {
    //setstate在timeout、原生事件中同步
    // setTimeout(() => {
    this.changeValue(1);
    this.changeValue(2); // state更新是批量的
    // }, 0);
  };
  changeValue = (v) => {
    // setState在合成事件、componentdidmount中是异步的， 这里的异步是批量更新，优化性能
    // this.setState(
    //   {
    //     counter: this.state.counter + v,
    //   },
    //   () => {
    //     console.log("props counter", this.state.counter);
    //   }
    // );
    this.setState((state) => ({
      counter: state.counter + v,
    }));
  };
  render() {
    return (
      <div>
        <h3>SetStatePage</h3>
        <button onClick={this.setCounter}>{this.state.counter}</button>
      </div>
    );
  }
}

export default SetStateComponent;

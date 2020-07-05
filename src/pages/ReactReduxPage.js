import React, { Component } from "react";
import store from "../store/ReduxStore";
export default class ReactReduxPage extends Component {
  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      // dispatch执行的时候 ，执行订阅函数
      this.forceUpdate();
      // if(XX) {//}
    });
    console.log(store.getState());
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  add = () => {
    store.dispatch({ type: "ADD" });
  };
  render() {
    return (
      <div>
        <h3>ReduxPage</h3>
        <p>counter - {store.getState().counter}</p>
        <button onClick={this.add}>add counter</button>
        {/* <button onClick={this.asyAdd}>asyAdd</button>
        <button onClick={this.promiseMinus}>promiseMinus</button> */}
        <p>name - {store.getState().name}</p>
        <button onClick={this.add}>add name</button>
      </div>
    );
  }
}

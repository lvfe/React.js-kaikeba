// import React from "react";
// import ReactDOM from "react-dom";
// import "./index.css";
// // import App from "./App";
// import AppRouter from "./AppRouter";
// import * as serviceWorker from "./serviceWorker";
// import { Provider } from "react-redux";
// import store from "./store/ReduxStore";
// ReactDOM.render(
//   <Provider store={store}>
//     {/* <App /> */}
//     <AppRouter />
//   </Provider>,
//   document.getElementById("root")
// );

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();

// import React, { Component } from "react";
// import ReactDOM from "react-dom";
import React from "./kkreact";
import ReactDOM, { useState } from "./kkreact/react-dom";
import Component from "./kkreact/component";
import "./index.css";
function FunctionComponent(props) {
  const [count, setCount] = useState(1);
  return (
    // <div className="border">
    //   FunctionComponent-{props.name}
    //   <button
    //     onClick={() => {
    //       setCount(count + 1);
    //     }}
    //   >
    //     {count}
    //   </button>
    //   {count % 2 ? <button>click</button> : <span>omg</span>}
    // </div>
    <div className="border" key="border">
      <button key="button" onClick={() => setCount(count + 1)}>
        {count}： count add
      </button>

      {count % 2 ? (
        <ul>
          <li key="0">0</li>
          <li key="1">1</li>
          <li key="2">2</li>
          <li key="3">3</li>
          <li key="4">4</li>
        </ul>
      ) : (
        <ul>
          <li key="0">0</li>
          <li key="2">2</li>
          <li key="3">3</li>
          <li key="4">4</li>
        </ul>
      )}
    </div>
  );
}
class ClassComponent extends Component {
  static defaultProps = {
    name: "default",
  };
  render() {
    return (
      <div className="border">
        ClassComponent-{this.props.name}
        <button
          onClick={() => {
            console.log(123);
          }}
        >
          Click
        </button>
      </div>
    );
  }
}
const jsx = (
  <div className="border" key="main">
    <p>全站</p>
    <a href="http://localhost:9000">Link</a>

    <FunctionComponent name="function" />
    <ClassComponent name="class"></ClassComponent>
    {/* {[1, 2].map((item) => (
      <div key={item}>{item}</div>
    ))} */}
    {/* <>
      <h2 key="h2">2</h2>
      <h2 key="h3">3</h2>
    </> */}
  </div>
);
ReactDOM.render(jsx, document.getElementById("root"));
// fragment, 少封装一点元素
// jsx 通过babel-loader转

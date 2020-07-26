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
import ReactDOM from "./kkreact/react-dom";
import Component from "./kkreact/component";
import "./index.css";
function FunctionComponent(props) {
  return <div className="border">FunctionComponent-{props.name}</div>;
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
  <div className="border">
    <p>全站</p>
    <a href="http://localhost:9000">Link</a>
    <FunctionComponent name="function"></FunctionComponent>
    <ClassComponent name="class"></ClassComponent>
    {[1, 2].map((item) => (
      <div key={item}>{item}</div>
    ))}
    <>
      <h2>2</h2>
      <h2>3</h2>
    </>
  </div>
);
ReactDOM.render(jsx, document.getElementById("root"));
// fragment, 少封装一点元素
// jsx 通过babel-loader转

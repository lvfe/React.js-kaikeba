import React, { Component } from "react";
import PropTypes from "prop-types";
import { createPortal } from "react-dom";
import { compose } from "redux";

export default class Dialog extends Component {
  static propTypes = {
    prop: PropTypes,
  };
  constructor(props) {
    const doc = window.document;
    this.node = doc.createElement("div"); // creawte many timess
    doc.body.appendChild(this.node);
  }
  componentWillUnmount() {
    window.document.body.removeChild(this.node);
  }

  render() {
    return createPortal(<div>dialog</div>, this.node);
  }
}
// // reducer
// reducer = (accumulater, currentValue) => accumulater + currentValue;
// //redux , js的状态容器，易于测试
// // 不要修改参数和值;
// // reaCt不是响应式
// function f1(arg1) {
//   return arg1;
// }
// function f2(arg2) {
//   return arg2;
// }
// f2(f1("sum")); //函数聚合

// const result = compose(f1, f2)("omg");
// function comppse(...fucs) {
//   if (func.length == 0) {
//     return (args) => args;
//   }
//   if (func.length == 1) {
//     return func[0];
//   }
//   return fucs.reduce((acc, curr) => (...args) => {
//     return acc(curr(...args));
//   });
// }

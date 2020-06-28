import React, { Component } from "react";
import { connect } from "react-redux";
class ReactReduxPage extends Component {
  render() {
    const { num, add } = this.props;
    console.log(this.props);
    return (
      <div>
        <h3>Redux - {num}</h3>
        <button onClick={add}>Click button</button>
      </div>
    );
  }
}
const mapStateTpProps = (state) => {
  return { num: state };
};
const mapDispatchToProps = {
  add: () => {
    return { type: "ADD" };
  },
};
export default connect(mapStateTpProps, mapDispatchToProps)(ReactReduxPage);

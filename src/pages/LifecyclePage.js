import React, { Component } from "react";
class LifeCyclePage extends Component {
  static defaultProps = {
    msg: "omg",
  };
  static propTypes = {
    // msg: PropTypes.string,
  };
  constructor(props) {
    super(props);
    this.state = { count: 0 };
    console.log("constructor");
  }
  static getDerivedStateFromProps(props, state) {
    console.log("getDerivedStateFromProps", props, state);
    const { count } = state;
    // return 一个对象更新state
    return count > 5 ? { count: 0 } : null;
  }
  componentWillMount() {
    console.log("componentWillMount");
  }
  componentDidMount() {
    console.log("componentDidMount");
  }
  shouldComponentUpdate(nextProps, nextState) {
    console.log("will receive", nextState, this.state);
    return nextState.count != 2;
  }
  componentWillUpdate() {
    console.log("componentWillUpdate");
  }
  componentDidUpdate() {
    console.log("componentDidUpdate");
  }
  setCount = () => {
    this.setState({ count: this.state.count + 1 });
    // this.setState((state) => ({ count: state.count + 1 }));
  };
  render() {
    console.log("render", this.props);

    return (
      <div>
        <h3>LifeCyclePage - {this.state.count}</h3>
        <button onClick={this.setCount}>click</button>
        <Child count={this.state.count} />
      </div>
    );
  }
}

class Child extends Component {
  // first time will not execuate
  componentWillReceiveProps(nextProps) {
    console.log("child-componentWillReceiveProps", nextProps);
  }
  componentWillUnmount() {
    console.log("child-componentWillUnmount");
  }
  render() {
    console.log("Child-render");
    const { count } = this.props;
    return <div>Child component - {count}</div>;
  }
}
export default LifeCyclePage;

// willmount//unsafe_willmount
// willRecieveProps
// componentWillUpdate

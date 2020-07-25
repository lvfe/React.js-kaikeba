import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
export default class RouterComponentPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  render() {
    const { count } = this.state;
    return (
      <div>
        <h3>Router Component page</h3>
        <button
          onClick={() => {
            this.setState({ count: count + 1 });
          }}
        >
          add count {count}
        </button>
        <Router>
          <Route children={() => <Child count={count} />}></Route>
        </Router>
      </div>
    );
  }
  //   children can be function/objet/array
}
class Child extends Component {
  componentDidMount() {
    console.log("componentdidmount");
  }
  componentWillUnmount() {
    console.log("componentdidunmount");
  }
  render() {
    console.log(this.props);

    return <div>Child</div>;
  }
}

import React, { useState, useEffect, PureComponent, useCallback } from "react";
const UseCallBackPage = () => {
  const [count, setCount] = useState(0);
  const [value, setValue] = useState("");
  const [date, setDate] = useState(new Date());
  const addClick = useCallback(() => {
    console.log("use callback" + count);
  }, [count]);

  // componentDidMoint, componentWillUnicompoennt, componentdidupdate
  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <div>
      <h3>UseCallbackPage</h3>
      <p>{count}</p>
      <p>parent: {date.toLocaleTimeString()}</p>
      <button onClick={() => setCount(count + 1)}>click</button>
      <input
        type="text"
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      <Child addClick={addClick}></Child>
    </div>
  );
};

export default UseCallBackPage;
class Child extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
    };
  }
  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({
        date: new Date(),
      });
    }, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }
  // shallow equal
  render() {
    console.log("render in child");

    const { addClick } = this.props;
    const { date } = this.state;
    return (
      <div>
        Child {date.toLocaleTimeString()}
        <button onClick={() => addClick()}> click clild</button>
      </div>
    );
  }
}

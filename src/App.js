import React, { useState, useEffect } from "react";
import "./App.css";
// import { Button } from "antd";
// import UseMemoPage from "./pages/UserMemoPage";
// import UseCallBackPage from "./pages/UseCallbaclPage";
// import SetStateComponent from "./pages/SetStatePage";
// import LifeCyclePage from "./pages/LifecyclePage";
// import ReactReduxPage from "./pages/ReactReduxPage";
// import ContextPage from "./pages/ContextPage";
// import HOCPage from "./pages/HOCPage";
import DecoratetPage from "./pages/DecoratetPage";
// import FormPage from "./pages/FormPage";
// import RCFormPage from "./components/RCFormPage";
import MYRCFormPage from "./components/MYRCFormPage";
import RCFormPage from "./pages/RCFormPage";

function App() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    // onluy work in componentDidMount/componentUpdate
    console.log("count", count);

    return () => {};
  }, [count]);

  return (
    <div className="App">
      {/* <UseMemoPage></UseMemoPage>
      <UseCallBackPage></UseCallBackPage>
      {count}
      {useClock().toString()}
      <Button type="primary" onClick={() => setCount(count + 1)}>
        Test
      </Button> */}
      {/* <SetStateComponent /> */}
      {/* <LifeCyclePage /> */}
      {/* <ReactReduxPage /> */}
      {/* <ContextPage /> */}
      {/* <HOCPage /> */}
      <DecoratetPage />
      {/* <FormPage /> */}
      {/* <RCFormPage /> */}
      {/* <MYRCFormPage /> */}
      {/* <RCFormPage /> */}
    </div>
  );
}

export default App;
// most outside, use***
function useClock() {
  const [date, setDate] = useState(new Date());
  // if(date){
  //   const [state, setstate] = useState(initialState) // wrong, not most outside
  // }
  useEffect(() => {
    console.log("component did mount");

    let timer = setInterval(() => {
      setDate(new Date());
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);
  return date;
}

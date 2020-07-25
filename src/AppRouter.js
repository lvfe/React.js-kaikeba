import React from "react";
import Home from "./pages/routers/Home";
import About from "./pages/routers/About";
import _404Page from "./pages/routers/_404Page";
import Prompt from "./kRouter-dom/Prompt";

// import RouterComponentPage from "./pages/RouterComponentPage";
// import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { BrowserRouter as Router, Route, Link } from "./kRouter-dom";
const AppRouter = (props) => {
  return (
    <div className="app">
      {/* <RouterComponentPage /> */}
      <Router>
        <Prompt message="Are you sure to leave" />
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/other">Other</Link>
        {/* <Link to="/product/123">Product</Link> */}
        {/* <Switch> */}
        <Route
          exact
          path="/"
          children={children}
          component={Home}
          render={render}
        ></Route>
        <Route path="/about" component={About}></Route>
        {/* <Route path="/product/:id" component={Product}></Route> */}
        <Route component={_404Page}></Route>
        {/* </Switch> */}
      </Router>
      {/* <div>独占路由</div> children/render is function
       * children > component>render, children不管匹配, 需要没有switch
       */}
    </div>
  );
};
function children(props) {
  console.log(props);

  return <div>Children</div>;
}
function render(props) {
  return <div>Render</div>;
}
// function Product({ match }) {
//   const { id } = match.params;
//   return (
//     <div>
//       id: {id}
//       <Link to="about">detail</Link>
//       <Route component={About}></Route>
//     </div>
//   );
// }
export default AppRouter;

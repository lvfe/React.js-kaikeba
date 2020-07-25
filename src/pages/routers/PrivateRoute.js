import React from 'react';
import { Route, Redirect } from 'react-router-dom';
const PrivateRoute = ({ isLogin, path, component:Component, ...restProps }) => {
  return <Route {...restProps} path="path" render={(props)=>isLogin?<Component {...props}/>: <Redirect to={{pathname: '/login', state: {from: props.location.pathname}}}/>/>;
};

export default PrivateRoute;

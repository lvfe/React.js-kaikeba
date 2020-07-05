const thunk = ({ dispatch, getState }) => {
  // next当做thunk, 上一轮聚合的值, 参考compose， 第一个是第一个
  return (next) => (action) => {
    if (typeof action == "function") {
      return action(getState, dispatch);
    }
    return next(action);
  };
};

export default thunk;

const logger = ({ dispatch, getState }) => {
  return (_) => (action) => {};
};

export default logger;
const promise = ({ dispatch, getState }) => {
  return (next) => (action) => {
    // isFSA判断是否标准 {type：&&&，payload: XXX}暗号苏丹
    if (isFSA(action)) {
      return isPromise(action) ? action.then((res) => dispatch) : next(action);
    }
    return next(action);
  };
};

export default promise;

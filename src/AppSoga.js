import React from "react";
const AppSoga = () => {
  return <div>123</div>;
};
function* hello() {
  yield "12";
  yield "ww";
}
var ss = hello();
console.log(ss.next());
console.log(ss.next());
// 惰性求职
var a = 0;
function fun() {
  let aa = yield((a = 1 + 1));
  return aa;
}
console.log(a);
let b = fun();
console.log(a);
b.next();
console.log(a);

export default AppSoga;

// "use strict";
let obj = { a: 5, b: { c: 3 } };

// Object.freeze(obj); //return 此obj
//!shadlow freese
// obj.b.c = 13; //不会报错
console.log(obj); //仍然是 {"a":5}
//!另外，freeze冻结的是堆内存中的值，和栈中的引用无关。
// obj = { a: 6 };
// console.log(obj);

function deepFreeze(obj) {
  if (typeof obj != "object" || obj === null) return obj;
  for (let prop in obj) {
    if (typeof obj[prop] == "object" && obj != null) {
      obj[prop] = deepFreeze(obj[prop]);
    }
  }
  return Object.freeze(obj);
}
deepFreeze(obj);
obj.b.c = 13; //不会报错
console.log(obj); //仍然是 {"a":5}

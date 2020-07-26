const obj = {
  data: 1,
  compositor: {
    b: 2,
    c: {
      data: 2,
    },
  },
  m: undefined,
  get: () => {
    return this.xxx.data;
  },
};
const test1 = obj;
test1.data = 2;
console.log(obj); // { data: 1, compositor: { b: 2 }, get: [Function: get] }

console.log(JSON.parse(JSON.stringify(obj))); //!missing get { data: 1, compositor: { b: 2 } }
const test3 = { ...obj };
test3.compositor.b = 4;
console.log(obj);
console.log(test3);

const test = Object.create(obj); //!test的原型链继承了obj shalowcopy the property
test.__proto__.data = 3;
test.__proto__.compositor.b = 3;
console.log(test.__proto__); //!should be __proto__

//!test shadow
const objclone = {
  compositor: {
    data: {
      m: 3,
    },
  },
  get: () => {
    return this.xxx.m;
  },
};
const test33 = { ...objclone };
test33.compositor.data = 4;
console.log(objclone);
console.log(test33);

//! deepcopy success
const test34 = { ...objclone };
test34.compositor = { data: 6 };
console.log(objclone);
console.log(test34);

function deepcopy(obj1) {
  if (typeof obj1 != "object" || obj1 == null) return obj1;
  var newObj = obj1.constructor();
  console.log(newObj);
  for (let prop in obj1) {
    if (typeof obj1[prop] == "object") {
      newObj[prop] = deepcopy(obj1[prop]);
    } else {
      newObj[prop] = obj1[prop];
    }
  }
  return newObj;
}
function typeString(obj) {
  var cons = Object.prototype.toString.call(obj).slice(8, -1);

  return cons === "Array" || cons === "Object";
}
const testfinal = deepcopy(obj);
testfinal.compositor.c.data = 6;
console.log("deepcopy", deepcopy(obj));
console.log("deepcopy", deepcopy(testfinal));

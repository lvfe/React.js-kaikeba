// export function render(
//     element: ReactElement,
//     container: Container,
//     callback:Function)

//     React.render(jsx, document.getElementById('body'))
//vnode, node是zhenshi node
import { TEXT } from "./const";
// next单元任务
let nextUnitOfWork = null;
// work in process fiber root
let wipRoot = null;
let currentRoot = null;
//当前正工作的fiber
let wipFiber = null;
const render = (vnode, container) => {
  //   const node = createNode(vnode);
  //   container.appendChild(node);
  wipRoot = {
    node: container,
    props: {
      children: [vnode],
    },
  };
  nextUnitOfWork = wipRoot;
};

function createNode(vnode) {
  const { type, props } = vnode;
  let node;
  if (type === TEXT) {
    const { nodeValue } = props;
    node = document.createTextNode(nodeValue);
  } else if (typeof type === "string") {
    node = document.createElement(type);
  } else if (typeof type === "function") {
    let vvnode = type.isReactComponent
      ? updateClass(vnode)
      : updateFunction(vnode);
    node = createNode(vvnode);
  } else {
    node = document.createDocumentFragment();
  }
  reconcileChildren(props.children, node);
  updateNode(node, props);
  return node;
}
function updateClass(vnode) {
  const { type, props } = vnode;
  let classObj = new type(props);
  return classObj.render();
  //   const cmp = new type(props);
  //   const children = [cmp.render()];
  //   reconcileChildren(vnode, children);
}
function updateFunction(vnode) {
  const { type, props } = vnode;
  return type(props);
}
function updateClassFiber(fiber) {
  const { type, props } = fiber;
  let classObj = new type(props);
  const children = [classObj.render()];
  reconcileChildren(fiber, children);
  //   const cmp = new type(props);
  //   const children = [cmp.render()];
  //   reconcileChildren(vnode, children);
}
function updateFunctionFiber(fiber) {
  wipFiber = fiber;
  //!source code当中是对象
  wipFiber.hooks = [];
  wipFiber.hookIndex = 0;

  const { type, props } = fiber;
  let cmp = type(props);
  const children = [cmp];
  reconcileChildren(fiber, children);
}
//! 深度优先遍历，考虑位置移动，同级比较 o(n)
//! 1.del: node not exist;
//! 2. replace: vnode， newndoe, (key , and type 不同)
//! 3. update. (type key相同)vnode, newnode不同
// function reconcileChildren_old(children, node) {
//   children.forEach((child) => {
//     // node.appendChild(createNode(child));
//     if (Array.isArray(child)) reconcileChildren(child, node);
//     else render(child, node);
//   });
// }
// 协调子节点
function reconcileChildren(workInProcessFiber, children) {
  let prevSibling = null;
  let oldFiber = workInProcessFiber.base && workInProcessFiber.base.child;
  for (let i = 0; i < children.length; i++) {
    let child = children[i];
    if (child == null) return;
    let sameType = child &&oldFiber&&child.type==oldFiber.type
    if(sameType) {
      // same type reuse
    }
    if(!sameType && child) // cjo;d exist, not same time
    let newFiber = {
      type: child.type,
      props: child.props,
      node: null, //三种操作
      base: null, //初次
      return: workInProcessFiber,
      effectTag: "PLACEMENT",
    };
    if(!sameType&&!child){
      // delete
    }
    //形成链表结构
    if (i === 0) {
      workInProcessFiber.child = newFiber;
    } else {
      prevSibling.sibling = newFiber;
    }
    prevSibling = newFiber;
  }
}
// for upate attribute
function updateNode(node, nextVal) {
  Object.keys(nextVal)
    .filter((i) => i !== "children")
    .forEach((key) => {
      if (key.slice(0, 2) === "on") {
        let eventName = key.slice(2).toLowerCase();
        node.addEventListener(eventName, nextVal[key]);
      }
      node[key] = nextVal[key];
    });
}
// {
// type， //标记类型
//     child,
//     sibling,
//     return,
//     node, //当前节点的真是dom 对象
//     base //存储旧fiber
// }
//! fiber: js对象， 组件将要或已经完成的对象，return/child/silbling
//!优点:拆分fiber,UI卡顿，多向链表, 赋予优先级，并发，更新停止， 共用渲染 -》ui更流畅
//!架构
//!实现filter
//!
//!
//!
//!
//!
function workLoop(deadline) {
  // 有下个任务， 并且当前帧没有结束
  while (nextUnitOfWork && deadline.timeRemaining() > 1) {
    console.log(1000);
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork); // execute curetn, return next
  }
  if (!nextUnitOfWork && wipRoot) {
    //没有任务了， 根节点还在
    // commit
    commitRoot();
  }
  requestIdleCallback(workLoop);
}
function commitRoot() {
  commitWorker(wipRoot.child);
  //处于循环， 提交后置成null
  currentRoot = wipRoot;
  wipRoot = null;
}
function commitWorker(fiber) {
  if (!fiber) {
    return;
  }
  let parentFiber = fiber.return;
  //向上查找， 因为有的fiber没有node, 如Provider, fragment, 需要找祖父
  while (!parentFiber.node) parentFiber = parentFiber.return;
  const parentNode = parentFiber.node;
  if (fiber.effectTag === "PLACEMENT" && fiber.node != null) {
    parentNode.append(fiber.node);
  }
  commitWorker(fiber.child);
  commitWorker(fiber.sibling);
}
function updateHostComponnet(fiber) {
  if (!fiber.node) {
    fiber.node = createNode(fiber);
  }
  // 协调
  const { children } = fiber.props;
  reconcileChildren(fiber, children);
  console.log("--fiber", fiber);
}
function performUnitOfWork(fiber) {
  const { type } = fiber;
  if (typeof type == "function") {
    type.isReactComponent
      ? updateClassFiber(fiber)
      : updateFunctionFiber(fiber);
  }
  //1. perfomr current
  else updateHostComponnet(fiber);
  //2. return next
  if (fiber.child) {
    return fiber.child;
  }
  // 没有子元素,寻找兄弟
  let nextFiber = fiber;
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }
    nextFiber = nextFiber.return;
  }
}
requestIdleCallback(workLoop);
export function useState(init) {
  const oldHook = wipFiber.base && wipFiber.base.hooks[wipFiber.hookIndex];
  const hook = oldHook
    ? {
        state: oldHook.state,
        queue: oldHook.queue,
      }
    : {
        state: init,
        queue: [],
      };
  // 模拟批量更新 【1,2,3】
  hook.queue.forEach((action) => {
    console.log(123, action);
    hook.state = action;
  });
  const setState = (action) => {
    //action can be func/value, setState异步的
    hook.queue.push(action);
    wipRoot = {
      node: currentRoot.node,
      props: currentRoot.props,
      base: currentRoot,
    };
    nextUnitOfWork = wipRoot;
  };
  wipFiber.hooks.push(hook);
  wipFiber.hookIndex++;
  return [hook.state, setState];
}
export default { render };

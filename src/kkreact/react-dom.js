// export function render(
//     element: ReactElement,
//     container: Container,
//     callback:Function)

//     React.render(jsx, document.getElementById('body'))
//vnode, node是zhenshi node
import { TEXT, PLACEMENT, DELETEION, UPDATE } from "./const";
// next单元任务
let nextUnitOfWork = null;
// work in process fiber root
let wipRoot = null;
let currentRoot = null;
//当前正工作的fiber
let wipFiber = null;
let deletions = null;

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
  deletions = [];
};

function createNode(vnode) {
  const { type, props } = vnode;
  let node;
  if (type === TEXT) {
    const { nodeValue } = props;
    node = document.createTextNode(nodeValue);
    updateNode(node, {}, props);
  } else if (typeof type === "string") {
    node = document.createElement(type);
    updateNode(node, {}, props);
  } else if (typeof type === "function") {
    let vvnode = type.isReactComponent
      ? updateClass(vnode)
      : updateFunction(vnode);
    node = createNode(vvnode);
    updateNode(node, {}, props);
  } else {
    node = document.createDocumentFragment();
    if (props != null) {
      console.log(123, node, props);
      updateNode(node, {}, props);
      // reconcileChildren_old(props.children, node);
    } else {
      // reconcileChildren_old(props.children, node);
      updateNode(node, {}, { children: [] });
    }
  }
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
  wipFiber = fiber;
  //!source code当中是对象
  wipFiber.hooks = [];
  wipFiber.hookIndex = 0;
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
function reconcileChildren_old(children, node) {
  children.forEach((child) => {
    // node.appendChild(createNode(child));
    if (Array.isArray(child)) reconcileChildren(child, node);
    else render(child, node);
  });
}
// 协调子节点
function reconcileChildren(returnFiber, newChildren) {
  let prevnewFiber = null;
  let oldFiber = returnFiber.base && returnFiber.base.child;
  //上一次插入位置v
  let lastPlacedIndex = 0;
  let nexIdx = 0;
  let nextOldFIber = null;
  let ShouldTrackSideEffect = true;
  if (!oldFiber) {
    ShouldTrackSideEffect = false;
  }

  for (; oldFiber != null && nexIdx < newChildren.length; nexIdx++) {
    if (oldFiber.index > nexIdx) {
      nextOldFIber = oldFiber;
      oldFiber = null;
    } else {
      nextOldFIber = oldFiber.sibling;
    }
    let newChild = newChildren[nexIdx];
    if (!(newChild.type === oldFiber.type && newChild.key === oldFiber.key)) {
      if (oldFiber == null) {
        oldFiber = nextOldFIber;
      }
      break;
    }
    // 可以复用
    let newFiber = {
      key: newChild.key,
      type: newChild.type,
      props: newChild.props,
      node: oldFiber.node,
      base: oldFiber,
      return: returnFiber,
      effectTag: UPDATE,
    };
    if (ShouldTrackSideEffect) {
      if (oldFiber && newFiber.base === null) {
        deletions.push({
          ...oldFiber,
          effectTag: DELETEION,
        });
      }
    }
    lastPlacedIndex = placeChild(
      newFiber,
      lastPlacedIndex,
      nexIdx,
      ShouldTrackSideEffect
    );
    if (prevnewFiber == null) {
      returnFiber.child = newFiber;
    } else {
      prevnewFiber.sibling = newFiber;
    }
    prevnewFiber = newFiber;
    oldFiber = nextOldFIber;
  }

  if (oldFiber == null) {
    for (; nexIdx < newChildren.length; nexIdx++) {
      let newCHild = newChildren[nexIdx];

      let newFiber = {
        key: newCHild.key,
        type: newCHild.type,
        props: newCHild.props,
        node: null,
        base: null,
        return: returnFiber,
        effectTag: PLACEMENT,
      };

      lastPlacedIndex = placeChild(newFiber, lastPlacedIndex, nexIdx);
      if (prevnewFiber === null) {
        returnFiber.child = newFiber;
      } else prevnewFiber.sibling = newFiber;

      prevnewFiber = newFiber;
    }
    return;
  }
  // keep scanning
  //2->3->4 , [1,2,3]map{} delete
  const existingChildren = mapRemaining(returnFiber, oldFiber);
  for (; nexIdx < newChildren.length; nexIdx++) {
    let newChild = newChildren[nexIdx];
    let newFiber = {
      key: newChild.key,
      type: newChild.type,
      props: newChild.props,

      return: returnFiber,
    };
    const matched = existingChildren.get(
      newFiber.key == null ? nexIdx : newFiber.key
    );
    if (matched) {
      newFiber = {
        ...newFiber,
        node: matched.node,
        base: matched,
        effectTag: UPDATE,
      };
      ShouldTrackSideEffect &&
        existingChildren.delete(newFiber.key == null ? nexIdx : newFiber.key);
    } else {
      newFiber = {
        ...newFiber,
        node: null,
        base: null,
        effectTag: PLACEMENT,
      };
    }
    lastPlacedIndex = placeChild(
      newFiber,
      lastPlacedIndex,
      nexIdx,
      ShouldTrackSideEffect
    );
    if (prevnewFiber == null) {
      returnFiber.child = newFiber;
    } else {
      prevnewFiber.sibling = newFiber;
    }
    prevnewFiber = newFiber;
  }
  if (ShouldTrackSideEffect) {
    existingChildren.forEach((child) =>
      deletions.push({
        ...child,
        effectTag: DELETEION,
      })
    );
  }
}
function mapRemaining(returnFiber, currentFirstFiber) {
  const existingChildren = new Map();
  let existingChild = currentFirstFiber;
  while (existingChild) {
    if (existingChild.key != null) {
      existingChildren.set(existingChild.key, existingChild);
    } else {
      existingChildren.set(existingChild.index, existingChild);
    }
    existingChild = existingChild.sibling;
    return existingChildren;
  }
}
function placeChild(newFiber, lastPlacedIndex, nexIdx, ShouldTrackSideEffect) {
  newFiber.index = nexIdx;
  if (!ShouldTrackSideEffect) {
    return lastPlacedIndex;
  }
  let base = newFiber.base;
  if (base != null) {
    let oldIndex = base.index;
    if (oldIndex < lastPlacedIndex) {
      return lastPlacedIndex;
    } else {
      return oldIndex;
    }
  } else {
    newFiber.effectTag = PLACEMENT;
    return lastPlacedIndex;
  }
}
function reconcileChildren_FIBER(workInProcessFiber, children) {
  let prevSibling = null;
  let oldFiber = workInProcessFiber.base && workInProcessFiber.base.child;
  for (let i = 0; i < children.length; i++) {
    let child = children[i];
    if (child == null) return;
    let newFiber = null;

    let sameType = child && oldFiber && child.type == oldFiber.type;
    if (sameType) {
      // same type reuse
      newFiber = {
        type: child.type,
        props: child.props,
        node: oldFiber.node, //三种操作.可以复用
        base: oldFiber, //初次
        return: workInProcessFiber,
        effectTag: UPDATE,
      };
    }
    if (!sameType && child) {
      // child exist, not same time
      newFiber = {
        type: child.type,
        props: child.props,
        node: null, //三种操作.可以复用
        base: null, //初次
        return: workInProcessFiber,
        effectTag: PLACEMENT,
      };
    }
    if (!sameType && oldFiber) {
      // delete
      oldFiber.effectTag = DELETEION;
      deletions.push(oldFiber);
      console.log(deletions);
    }
    if (oldFiber) {
      debugger;
      oldFiber = oldFiber.sibling;
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
// old {q:1} new {b:1}
function updateNode(node, prev, nextVal) {
  Object.keys(prev)
    .filter((i) => i !== "children")
    .forEach((key) => {
      if (key.slice(0, 2) === "on") {
        let eventName = key.slice(2).toLowerCase();
        node.removeEventListener(eventName, prev[key]);
      } else {
        if (!(key in nextVal)) {
          node[key] = "";
        }
      }
    });
  if (nextVal != null)
    Object.keys(nextVal)
      .filter((i) => i !== "children")
      .forEach((key) => {
        if (key.slice(0, 2) === "on") {
          let eventName = key.slice(2).toLowerCase();
          node.addEventListener(eventName, nextVal[key]);
        } else {
          node[key] = nextVal[key];
        }
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
    console.log("working loop");
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork); // execute curetn, return next
  }
  if (!nextUnitOfWork && wipRoot) {
    //没有任务了， 根节点还在
    // commit
    commitRoot();
  }
  requestIdleCallback(workLoop);
}
function delFiber(fiber, parentNode) {
  if (fiber.node) {
    parentNode.removeChild(fiber.node);
  } else {
    delFiber(fiber.child, parentNode);
  }
}
function commitRoot() {
  debugger;
  deletions.forEach(commitWorker);
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
  if (fiber.effectTag === PLACEMENT && fiber.node != null) {
    parentNode.append(fiber.node);
  } else if (fiber.effectTag === UPDATE && fiber.node != null) {
    // parentNode
    updateNode(fiber.node, fiber.base.props, fiber.props);
  } else if (fiber.effectTag === DELETEION && fiber.node != null) {
    delFiber(fiber, parentNode);
  }
  commitWorker(fiber.child);
  commitWorker(fiber.sibling);
}
function updateHostComponnet(fiber) {
  if (!fiber.node) {
    fiber.node = createNode(fiber);
  }
  // 协调
  console.log(fiber.props, "hello");
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
  deletions = [];
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

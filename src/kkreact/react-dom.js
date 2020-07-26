// export function render(
//     element: ReactElement,
//     container: Container,
//     callback:Function)

//     React.render(jsx, document.getElementById('body'))
//vnode, node是zhenshi node
import { TEXT } from "./const";
const render = (vnode, container) => {
  console.log(vnode);
  const node = createNode(vnode);
  container.appendChild(node);
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
}
function updateFunction(vnode) {
  const { type, props } = vnode;
  return type(props);
}

function reconcileChildren(children, node) {
  children.forEach((child) => {
    // node.appendChild(createNode(child));
    if (Array.isArray(child)) reconcileChildren(child, node);
    else render(child, node);
  });
}
// for upate attribute
function updateNode(node, nextVal) {
  Object.keys(nextVal)
    .filter((i) => i !== "children")
    .forEach((key) => {
      if (key.slice(0, 2) == "on") {
        let eventName = key.slice(2).toLowerCase();
        node.addEventListener(eventName, nextVal[key]);
      }
      node[key] = nextVal[key];
    });
}

export default { render };

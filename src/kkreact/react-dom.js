// export function render(
//     element: ReactElement,
//     container: Container,
//     callback:Function)

//     React.render(jsx, document.getElementById('body'))
//vnode, node是zhenshi node
import { TEXT } from "./const";
const render = (vnode, container) => {
  console.log(vnode, container);
  const node = createNode(vnode);
  container.appendChild(node);
};

function createNode(vnode) {
  const { type, props } = vnode;

  let node;
  if (type == TEXT) {
    const { nodeValue } = props;
    node = document.createTextNode(nodeValue);
  } else {
    node = document.createElement(type);
    reconcileChildren(props.children, node);
  }
  return node;
}

function reconcileChildren(children, node) {
  children.forEach((child) => {
    node.appendChild(createNode(child));
  });
}

export default { render };

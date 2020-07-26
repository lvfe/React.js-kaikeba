import { TEXT } from "./const";
// not consider key, ref
const createElement = (type, config, ...children) => {
  if (config) {
    delete config.__source;
    delete config.__self;
  }
  console.log(type, config, children);
  const props = {
    ...config,
    children: children.map((child) =>
      typeof child == "object" ? child : createTextNode(child)
    ),
  };
  return { type, props };
};
function createTextNode(text) {
  return {
    type: TEXT,
    props: {
      nodeValue: text,
      children: [],
    },
  };
}
export default { createElement };

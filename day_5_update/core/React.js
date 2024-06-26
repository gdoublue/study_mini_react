/**
 * @author zhui 906613279@qq.com
 * @description 模拟实现React mini版
 */

const functionComponents = [];

const createdElement = (type, props, ...children) => {
  //判断是否是组件
  if (typeof type === "object") {
    return type;
  }

  //判断是不是函数组件
  if (typeof type === "function") {
    console.log("createdElementFFFFF", type, props, children);
    const elm = {};
    //记录函数组件 用于更新
    functionComponents.push(elm);
    Object.assign(elm, {

      ...type(props),
      updateFunction: () => {
        return type(props);
          // Object.assign(elm,  type(props));
      },
    });

    return elm;
  }

  return {
    type,
    props: {
      ...props,
      children: children.map((child) => {
        return typeof child === "object" ? child : createTextElement(child);
      }),
    },
  };
};

const createTextElement = (text) => {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: [],
    },
  };
};

let root;
let currentRoot;
let wipFiber;
const render = (element, container) => {
  console.log("fiberRender", element, container);
  root = {
    dom: container,

    props: { children: [element] },
  };
  nextUnitofWork = root;

  requestIdleCallback(workLoop);
};

export function createDom(fiber) {
  console.error("createDom", fiber);
  return fiber.type === "TEXT_ELEMENT"
    ? document.createTextNode("")
    : document.createElement(fiber.type);
}

function updateProps(dom, props, preProps) {
  // if(preProps){
  //   console.log("更新Props===========");
  //   console.log("dom", dom);
  //   console.log("props", props);
  //   console.log("preProps", preProps);
  //
  //   console.log("^^^^^^^^^^^^^^^^^^^");
  // }

  preProps = preProps || {};
  props = props || {};
  // props有，旧的preProps没有，修改或者增加
  Object.keys(props).forEach((name) => {
    if (name !== "children") {
      if (name.startsWith("on")) {
        if (name in preProps) {
          // 删除事件
          dom.removeEventListener(
            name.toLowerCase().substring(2),
            preProps[name],
          );
        }
        // 事件处理
        const eventType = name.toLowerCase().substring(2);
        dom.addEventListener(eventType, props[name]);
      } else {
        // 其他属性
        if (props[name] && props[name] !== 0) {
          dom[name] = props[name];
        }
      }
    }
  });
  // 旧的preProps有，新的props没有，删除/移除事件
  Object.keys(preProps).forEach((name) => {
    if (name !== "children") {
      if (!name in props) {
        if (name.startsWith("on")) {
          if (props[name]) {
            // 删除事件
            dom.removeEventListener(
              name.toLowerCase().substring(2),
              preProps[name],
            );
          }
        } else {
          // 其他属性
          dom.removeAttribute(name);
        }
      }
    }
  });
}

let deletions = [];
export function calc(fiber) {
  console.log("calc++++++++++++++++++++", fiber)
  if (!fiber.dom) {
    fiber.dom = createDom(fiber);
  }

  updateProps(fiber.dom, fiber.props, fiber?.alterNate?.props);

  let preFiber;
  let oldFiber = fiber.alterNate?.child;
  fiber.props.children.forEach((child, index) => {
    const isSame = oldFiber && oldFiber.type === child.type;
    // let item;
    // console.log("isSame", isSame, oldFiber, child)
    if (isSame) {

      // item = {
      //   type: child.type,
      //   parent: fiber,
      //   dom: oldFiber.dom,
      //   props: child.props,
      //   alterNate: oldFiber,
      //   effectTag: "UPDATE",
      // }
      child.parent = fiber;
      child.effectTag = "UPDATE";

      child.dom = oldFiber.dom
      child.alterNate = oldFiber

    } else {
      if (oldFiber) {
        deletions.push(oldFiber);
      }
      // item = {
      //   type: child.type,
      //   parent: fiber,
      //   dom: null,
      //   props: child.props,
      //   effectTag: "PLACEMENT",
      // };
      child.parent = fiber;
      child.dom = null
      child.effectTag = "PLACEMENT";

    }
    if (oldFiber) {
      oldFiber = oldFiber.sibling;
    }
    if (index === 0) {
      fiber.child = child;
      preFiber = child;
    } else {
      preFiber.sibling = child;
      preFiber = child;
    }
  });

  nextUnitofWork = findNextFiber(fiber);
}

//使用 requestIDleCallback 优化
let nextUnitofWork = null;
function workLoop(deadline) {
  while (nextUnitofWork && deadline.timeRemaining() > 10) {
    calc(nextUnitofWork);
  }
  if (nextUnitofWork) {
    requestIdleCallback(workLoop);
  } else {
    if (root) {
      commitRoot();
    }
  }
}

function commitRoot() {
  console.time("commitRoot");
  root && commitWork(root.child);
  console.timeEnd("commitRoot");
  console.log("deletions", deletions);
  while (deletions.length) {
    const fiber = deletions.pop();
    if (fiber.dom) {
      fiber.dom.parentNode.removeChild(fiber.dom);
    }
  }

  currentRoot = root;
  root = null;
}
function commitWork(fiber) {
  if (!fiber) return;
  let parentFiber = fiber.parent;
  while (!parentFiber.dom) {
    parentFiber = parentFiber.parent;
  }
  try {
    if (fiber.effectTag === "PLACEMENT") {
      console.log("新增", fiber.dom);
      parentFiber.dom.appendChild(fiber.dom);
    } else {
      console.warn("更新#####", fiber);
    }
  } catch (e) {
    console.error("fiber.dom err", fiber);
  }

  commitWork(fiber.child);
  commitWork(fiber.sibling);
}

function findNextFiber(fiber) {
  if (fiber.child) {
    return fiber.child;
  } else if (fiber.sibling) {
    return fiber.sibling;
  } else {
    let parent = fiber.parent;
    while (parent) {
      if (parent.sibling) {
        return parent.sibling;
      }
      // console.log('上一级 fiber',parent)
      parent = parent.parent;
    }
  }
}

//更新

let functionIdx
function update() {
  console.log("update-----index", functionComponents);
  let Index = functionIdx || functionComponents.length -1;
  functionComponents[Index].functionIndex = Index;
  return () => {
    functionIdx = Index;
    console.log({ Index, functionComponents });
   const newItem =   functionComponents[Index].updateFunction();


    root = {
      dom: functionComponents[Index].dom,
      props: newItem.props,
      alterNate: functionComponents[Index],
    };

    nextUnitofWork = root
    console.log("nextUnitofWork", nextUnitofWork);
    requestIdleCallback(workLoop);
    Object.assign(functionComponents[Index], newItem)
  };

  /*  functionComponents.forEach((item) => {
    // console.log("old", item);
    const newNode = item.updateFunction();
    Object.assign(item, newNode);
  });
  root = {
    dom: currentRoot.dom,
    props: currentRoot.props,
    alterNate: currentRoot,
  };
  nextUnitofWork = root;

  requestIdleCallback(workLoop);*/
}

const react = {
  createElement: createdElement,
  render: render,
  update: update,
};
export default react;

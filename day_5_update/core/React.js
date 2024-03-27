/**
 * @author zhui 906613279@qq.com
 * @description 模拟实现React mini版
 */

const createdElement = (type, props, ...children) => {
  // console.log('%c createdElement======', 'color: #4096ef')
  // console.log(type,props,children)
  //判断是否是组件
  if (typeof type === "object") {
    return type;
  }
  //判断是不是函数组件
  if (typeof type === "function") {
    return type(props);
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
const render = (element, container) => {
  console.log('fiberRender',element,container)
  root = {
    dom: container,
    child: element,
    props: element.props,
  };
  nextUnitofWork = root;

  requestIdleCallback(workLoop);
};

export function createDom(fiber) {
  return fiber.type === "TEXT_ELEMENT"
    ? document.createTextNode("")
    : document.createElement(fiber.type);
}

function updateProps(dom, props, preProps) {
  preProps = preProps || {};
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
        dom[name] = props[name];
        if(preProps[name]){
        console.log('xinjiu',props[name],preProps[name] )
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
export function calc(fiber) {
  if (!fiber.dom) {
    fiber.dom = createDom(fiber);
  }

  //
  updateProps(fiber.dom, fiber.props, fiber?.alterNate?.props);

  let preFiber;
  let oldFiber = fiber.alterNate?.child;
  fiber.props.children.forEach((child, index) => {
    const isSame = oldFiber && oldFiber.props.type === child.props.type;
    let item;
    if (isSame) {
      item = {
        type: child.type,
        parent: fiber,
        dom: oldFiber.dom,
        props: child.props,
        alterNate: oldFiber,
        effectTag: "UPDATE",
      };
    } else {
      item = {
        type: child.type,
        parent: fiber,
        dom: null,
        props: child.props,
        effectTag: "PLACEMENT",
      };
    }
    if (oldFiber) {
      oldFiber = oldFiber.sibling;
    }
    if (index === 0) {
      fiber.child = item;
      preFiber = item;
    } else {
      preFiber.sibling = item;
      preFiber = item;
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
    parentFiber.dom.appendChild(fiber.dom);
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
function update() {
  root = {
    dom: currentRoot.dom,
    child: currentRoot.child,
    props: currentRoot.props,
    alterNate: currentRoot,
  };
  nextUnitofWork = root;

  requestIdleCallback(workLoop);
}

const react = {
  createElement: createdElement,
  render: render,
  update: update,
};
export default react;

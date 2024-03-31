/**
 * @author zhui 906613279@qq.com
 * @description 使用fiber实现
 */

const render = (element, container) => {
  // console.log('fiberRender',element,container)
  root = {
    dom: container,
    child: element,
    props: element.props,
  };
  calc(root);

  console.time("react-render");
  requestIdleCallback(workLoop);
};

export function createDom(fiber) {
  return fiber.type === "TEXT_ELEMENT"
    ? document.createTextNode("")
    : document.createElement(fiber.type);
}

function setProps(dom, props) {
  Object.keys(props)
    .filter((key) => key !== "children")
    .forEach((name) => {
      //处理事件
      if (name.startsWith("on")) {
        // 事件处理
        const eventType = name.toLowerCase().substring(2);
        dom.addEventListener(eventType, props[name]);
      } else {
        // 其他属性
        dom[name] = props[name];
      }
    });
}
export function calc(fiber) {
  if (!fiber.dom) {
    fiber.dom = createDom(fiber);
  }

  setProps(fiber.dom, fiber.props);

  let preFiber;
  fiber.props.children.forEach((child, index) => {
    const item = {
      type: child.type,
      parent: fiber,
      dom: null,
      props: child.props,
    };
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
    console.timeEnd("react-render");

    if (root) {
      commitRoot();
    }
  }
}
let root;
function commitRoot() {
  console.time("commitRoot");
  root && commitWork(root.child);
  console.timeEnd("commitRoot");
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
export default render;

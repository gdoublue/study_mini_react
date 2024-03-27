/**
 * @author zhui 906613279@qq.com
 * @description 模拟实现React mini版
 */

import renderFiber from './render_fiber.js'


const createdElement = (type, props, ...children) => {
    // console.log('%c createdElement======', 'color: #4096ef')
    // console.log(type,props,children)
    //判断是否是组件
    if(typeof type==='object'){

        return type
    }
    //判断是不是函数组件
    if(typeof type === 'function'){
        return type(props)
    }

    return {
        type,
        props: {
            ...props,
            children: children.map(child => {
                return typeof child === 'object' ? child : createTextElement(child)
            })
        }
    }
}
const render = (element, container) => {
    const dom = element.type === 'TEXT_ELEMENT' ? document.createTextNode('') : document.createElement(element.type)
    const isProperty = key => key !== 'children'
    Object.keys(element.props)
        .filter(isProperty)
        .forEach(name => {
            dom[name] = element.props[name]
        })
    element.props.children.forEach(child => {
        render(child, dom)
    })
    container.appendChild(dom)
}

const createTextElement = text => {
    return {
        type: 'TEXT_ELEMENT',
        props: {
            nodeValue: text,
            children: []
        }
    }
}


const react =  {
    createElement: createdElement,
    render:renderFiber,
}
export default react

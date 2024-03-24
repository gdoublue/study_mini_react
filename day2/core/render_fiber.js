/**
 * @author zhui 906613279@qq.com
 * @description 使用fiber实现
 */
// requestIdleCallback((t) => {
//     console.log('requestIdleCallback')
// }





const render = (element, container) => {

    // console.log('fiberRender',element,container)
    calc({
        dom: container,
        child: element,
        props: element.props,
    })
  console.time('react-render')
    requestIdleCallback(workLoop)


}

export function createDom(fiber){
 return   fiber.type === 'TEXT_ELEMENT' ? document.createTextNode('') : document.createElement(fiber.type)

}

function setProps(dom,props) {
    Object.keys(props)
        .filter(key => key !== 'children')
        .forEach(name => {
            dom[name] = props[name]

        })
}
 export function calc(fiber){
    if(!fiber.dom){
        fiber.dom = createDom(fiber)
        fiber.parent.dom.appendChild(fiber.dom)
    }

    setProps(fiber.dom,fiber.props)



    let preFiber
       fiber.props.children.forEach((child,index) => {
         const item = {
             type:child.type,
             parent:fiber,
             dom:null,
             props:child.props,

         }
         if(index ===0){
                fiber.child = item
             preFiber = item
         }else{
                preFiber.sibling = item
                preFiber = item
         }


     })

     nextUnitofWork = findNextFiber(fiber)


 }

 //使用 requestIDleCallback 优化
let nextUnitofWork = null
 function workLoop(deadline){
     while(nextUnitofWork && deadline.timeRemaining() > 50){
          calc(nextUnitofWork)
     }
     if(nextUnitofWork){
         requestIdleCallback(workLoop)
     }else{
         console.timeEnd('react-render')
     }

     // console.log(deadline.timeRemaining())
     // requestIdleCallback(workLoop)
 }
 function performUnitofWork(fiber){
    return calc(fiber)
 }

 function findNextFiber(fiber){
     if(fiber.child){
         return fiber.child
     }else if(fiber.sibling){
         return fiber.sibling
     }else{
         return fiber.parent.sibling
     }

 }
export default render

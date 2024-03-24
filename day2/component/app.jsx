/**
 * @author zhui 906613279@qq.com
 * @description
 */
import React from "../core/React.js";
import  Appcmp from './app.js'
import Test from './test.jsx'
const classArr = ["aaa", "bbb", "ccc",'AMD'];

let i = 0
const childrenLIst = []
while (i < 10000){
    i++
    childrenLIst.push(React.createElement('li', {id:'test'+i}, '这是第'+i+'个li'))
}
const UlCmp = React.createElement('ul', {}, ...childrenLIst)


// console.log({ Appcmp ,Test });
  const DDD = React.createElement('div', {class:'app'}, 'app',React.createElement('h2',{class:'H2'},'这是标题DDD'))
 const app = (
  <div>
   <UlCmp/>
  </div>
);

export default app

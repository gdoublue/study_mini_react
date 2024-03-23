/**
 * @author zhui 906613279@qq.com
 * @description
 */
import React from "../core/React.js";
import  Appcmp from './app.js'
import Test from './test.jsx'
const classArr = ["aaa", "bbb", "ccc"];
console.log({ Appcmp ,Test });
// export const app = React.createElement('div', {class:'app'}, 'app',React.createElement('h2',{class:'H2'},'这是标题好'))
 const app = (
  <div>
    <h2 class={classArr[0]}>这里是app.jsx</h2>
      <Test></Test>
    <h2 class={classArr[1]}>{classArr[1]}</h2>
    <h2 class={classArr[2]}>{classArr[2]}</h2>
  </div>
);

export default app

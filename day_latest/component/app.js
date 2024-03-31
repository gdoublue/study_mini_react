/**
 * @author zhui 906613279@qq.com
 * @description
 */
import React from "../core/React.js";

import Test from "./test.jsx";
const classArr = ["aaa", "bbb", "ccc"];
console.log({ Test });
// console.log({ React });
const app = React.createElement(
  "div",
  { class: "app" },
  "app",
  React.createElement(
    "h2",
    { class: "H2", style: { color: "#4096ef" } },
    "这是aaa.js 标题",
  ),
  Test, //追加子组件
);

export default app;

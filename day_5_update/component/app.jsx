/**
 * @author zhui 906613279@qq.com
 * @description
 */
import React from "../core/React.js";

const classArr = ["aaa", "bbb", "ccc", "AMD"];

let i = 0;

function NBA() {
  console.log('注册NBA')
  const random = Math.floor(Math.random() * 100);
  return (
    <div className="nba">
      <h1>
        Test
        <img
          src="http://192.168.110.50:8080/favicon.ico"
          alt="NBA Logo"
          title="NBA Logo"
        ></img>
        random:{random}
      </h1>
      <Player num={23}></Player>
    </div>
  );
}

let num = 1023;
function Player({ num }) {
  return (
    <div className="player">
      <h4>{num}</h4>
      <LBJ></LBJ>
      {showMi ? <div>米切尔</div> : false}
    </div>
  );
}

function FIFA() {
  console.log("%c%s", "color:red;font-size:30px;", "FIFA_BASKETBALL");
  return <div style="color:green;font-size:30px;">FIFA_BASKETBALL</div>;
}

let index = 0;
const imgList = [
  "http://192.168.110.50/api/gridinter-component/attachment/preViewPicture?id=932506326795636736",
  "https://cdn.nba.com/headshots/nba/latest/1040x760/2544.png", //'LBJ'
  "https://cdn.nba.com/headshots/nba/latest/1040x760/1629029.png",
  "https://cdn.nba.com/headshots/nba/latest/1040x760/1629028.png",
  "https://cdn.nba.com/headshots/nba/latest/1040x760/2547.png",
  "https://cdn.nba.com/headshots/nba/latest/1040x760/201933.png", //GF
  "https://cdn.nba.com/headshots/nba/latest/1040x760/202322.png", // wall
  "https://cdn.nba.com/headshots/nba/latest/1040x760/202331.png", //'PG'
  "https://cdn.nba.com/headshots/nba/latest/1040x760/202681.png", //'凯里'
  "https://cdn.nba.com/headshots/nba/latest/1040x760/202691.png", //KT
  "https://cdn.nba.com/headshots/nba/latest/1040x760/1629027.png",
  "https://cdn.nba.com/headshots/nba/latest/1040x760/1629026.png",
  "https://cdn.nba.com/headshots/nba/latest/1040x760/1629025.png",
  "https://cdn.nba.com/headshots/nba/latest/1040x760/1628989.png",
];

let imgUrl = imgList[index];
let showMi = false;
function LBJ() {
  // console.log('index',index++)
  console.log("注册组件LBJ");
  const update = React.update();
  function handleClick() {
    //根据当前index  循环 imgList 的索引
    showMi = !showMi;
    index = index + 1 >= imgList.length - 1 ? 0 : index + 1;
    console.log("index", index);
    imgUrl = imgList[index];
    console.log("imgURL", imgUrl);
    update();
  }
  return (
    <div className="lbj">
      <img
        style="width:100px;height:auto;"
        onClick={handleClick}
        src={imgUrl}
        alt="NBA plAYER"
        title="NBA 运动员"
      ></img>
      点击图片更改 {index}
      {index % 2 === 0 ? <h2>@@@@</h2> : <h1>##11##</h1>}
      {index % 2 === 0 ? <div>///||\\\</div> : false}
    </div>
  );
}
// const childrenLIst = [];
// while (i < 20000) {
//   i++;
//   childrenLIst.push(
//     React.createElement("li", { id: "test" + i }, "这是第" + i + "个li"),
//   );
// }
// const UlCmp = React.createElement("ul", {}, ...childrenLIst);

// console.log({ Appcmp ,Test });

function app() {
  console.log('注册组件app')
  return (
    <div className={index}>
      <NBA></NBA>
      <FIFA></FIFA>
    </div>
  );
}

export default app;

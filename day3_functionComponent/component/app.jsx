/**
 * @author zhui 906613279@qq.com
 * @description
 */
import React from "../core/React.js";

const classArr = ["aaa", "bbb", "ccc", "AMD"];

let i = 0;

function NBA() {

  return (
    <div className="nba">
      <h1>
        NBA
        <img
          src="https://cdn.nba.com/logos/leagues/logo-nba.svg"
          alt="NBA Logo"
          title="NBA Logo"
        ></img>
      </h1>
      <Player num={55555}>



      </Player>
        <Player num={666}>



        </Player>
    </div>
  );
}



let num = 1023;
function Player({num} ) {
  return (
    <div className="player">
        <h4>{num}</h4>
        <LBJ></LBJ>
    </div>
  );
}
function LBJ( ) {
  return (
    <div className='lbj'>
      <img
        src="https://cdn.nba.com/headshots/nba/latest/1040x760/2544.png"
        alt="NBA Logo"
        title="NBA Logo"
      ></img>


    </div>
  );
}
const childrenLIst = [];
while (i < 20000) {
  i++;
  childrenLIst.push(
    React.createElement("li", { id: "test" + i }, "这是第" + i + "个li"),
  );
}
const UlCmp = React.createElement("ul", {}, ...childrenLIst);

// console.log({ Appcmp ,Test });

const app = (
  <div>
    {/*<NBA></NBA>*/}
      <UlCmp></UlCmp>
  </div>
);

export default app;

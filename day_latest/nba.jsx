
/**
 * @author zhui
 * @description
 */
import React from "./core/React.js";

const classArr = ["aaa", "bbb", "ccc", "AMD"];

let i = 0;

function NBA() {
    console.log('注册NBA')
    const random = Math.floor(Math.random() * 100);
    return (
        <div className="nba">
            <h1>
                NBA
                <img
                    src="https://www.nba.com/favicon.ico"
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


const FIFA = <div style="color:green;font-size:30px;">FIFA_BASKETBALL</div>;

let index = 0;
const imgList = [

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


let showMi = false;
function LBJ() {
    // console.log('index',index++)
    const [imgIndex,setImgIndex]  =React.useState(0)
    const [imgUrl,setImgUrl]  =React.useState(imgList[0])


    function handleClick() {
        //根据当前index  循环 imgList 的索引
        if(imgIndex === imgList.length-1){
            setImgIndex(0)
            setImgUrl(imgList[0])
        }else{
            setImgIndex(imgIndex+1)
            setImgUrl(imgList[imgIndex+1])
        }

    }
    return (
        <div className="lbj">
            <div>
                <img
                    style="width:100px;height:auto;"
                    onClick={handleClick}
                    src={imgUrl}
                    alt="NBA plAYER"
                    title="NBA 运动员"
                ></img>
            </div>


            点击图片切换

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

function App() {

    return (
        <div className='nba'>
            <NBA></NBA>

        </div>
    );
}

export default App;

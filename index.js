const boxes=document.querySelectorAll(".box");
const gameInfo=document.querySelector(".game-info");
const winstatusShow=document.querySelector(".winstatusShow");
const newGameBtn=document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPositions=[
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
];

function initGame(){
    currentPlayer="X";
    gameGrid=["","","","","","","","",""];
    newGameBtn.classList.remove("active");
    gameInfo.innerText=`currentPlayer- ${currentPlayer}`;
}

initGame();

const xArray=new Map();
const yArray=new Map();

boxes.forEach((box,index)=>{
    box.addEventListener("click",()=>{
        if(!xArray.has(index) && !yArray.has(index)){
            if(currentPlayer=="X") xArray.set(index,true);
            else yArray.set(index,true);
            handleClick(index);
            gameInfo.innerText=`currentPlayer- ${currentPlayer}`;
        }    
    })
});


function changeTurn(currPlayer){
    if(currPlayer=="X") return "Y";
    return "X";
}

let count=0;

function handleClick(index){
    boxes[index].innerText=currentPlayer;
    count++;
    if(count>2) checkWinStatus(currentPlayer);
    if(count==9) newGameBtn.classList.add("active");
    currentPlayer=changeTurn(currentPlayer);
}

function checkWinStatus(currentPlayer){
    let flag=false;
    if(currentPlayer=="X"){
        winningPositions.forEach((row) => {
            var countEls = 0;
            row.forEach((element) => {
                if(xArray.has(element)) countEls++;
            });
            if(countEls>=3) {
                // console.log("Win game by x");
                flag=true;
                newGameBtn.classList.add("active");
            }
        });
    }
    else{
        winningPositions.forEach((row) => {
            var countEls = 0;
            row.forEach((element) => {
                if(yArray.has(element)) countEls++;
            });
            if(countEls>=3) {
                flag=true;
                newGameBtn.classList.add("active");
            }

        });
    }
    if(flag){
        winstatusShow.classList.add("active");
        winstatusShow.innerText=`Game won by  ${currentPlayer} 🎈🎊🎉`;
    } 
}





function restartFunc(){
    xArray.clear();
    yArray.clear();
    winstatusShow.classList.remove("active");


    boxes.forEach((box,index)=>{
        boxes[index].innerText="";
    });

    initGame();
}
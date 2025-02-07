let boxes=document.querySelectorAll(".box");
let resetbtn=document.querySelector("#reset-btn");
let newGameBtn=document.querySelector(".new-btn");
let msg=document.querySelector(".msg");
let msgContainer=document.querySelector(".msg-container");

let turnO=true;
const winPatterns=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];

const resetGame=()=>{
    turnO=true;
    enableBoxes();
    msgContainer.classList.add("hide"); 
}
boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        if(turnO){
            box.innerHTML="O";
            box.classList.add("o-mark");
            turnO=false;
        }
        else{
            box.innerHTML="X";
            box.classList.add("x-mark");
            turnO=true;
        }
        box.disabled=true;
        checkWinner();
    });
});

const enableBoxes=()=>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
    }
}
const disableBoxes=()=>{
    for(let box of boxes){
        box.disabled=true;
    }
}
const showWinner=(winner)=>{
    msg.innerHTML=`Congratulation,Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}
const checkWinner=()=>{
    let winnerFound=false;
    for(let pattern of winPatterns){
        let pos1Val=boxes[pattern[0]].innerText;
        let pos2Val=boxes[pattern[1]].innerText;
        let pos3Val=boxes[pattern[2]].innerText;

        if(pos1Val!="" && pos2Val!="" && pos3Val!=""){
            if(pos1Val===pos2Val && pos2Val===pos3Val){
                showWinner(pos1Val);
                winnerFound=true;
                break;
            }
        }
    }
    if(!winnerFound){
        let allFilled=true;
        boxes.forEach((box) => {
            if (box.innerText==="") {
                allFilled=false;
            }
        });
        if(allFilled){
            showDraw();
        }
    }
};

const showDraw = () => {
    msg.innerHTML="It's a draw!";
    msgContainer.classList.remove("hide");
    disableBoxes();
};

newGameBtn.addEventListener("click",resetGame);
resetbtn.addEventListener("click",resetGame);
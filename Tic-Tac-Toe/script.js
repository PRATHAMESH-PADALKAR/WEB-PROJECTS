const boxes = document.querySelectorAll(".box")
const gameInfo = document.querySelector(".game-info")
const btn = document.querySelector(".btn")

let currentPlayer
let gameGrid
let count =0;
const winningPos = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
]

function initGame(){
    currentPlayer = "X"
    gameGrid = ["","","","","","","","",""]
    boxes.forEach((box,index)=>{
        box.innerText = "";
        box.classList.remove("win")
    })
    btn.classList.remove("active")
    gameInfo.innerText = `Current Player - ${currentPlayer}`
    count = 0;
}
initGame()

boxes.forEach((box,index)=>{
    box.addEventListener('click',()=>{handleClick(index)})
})

function handleClick(index){
    if(gameGrid[index] === ""){
        boxes[index].innerText = currentPlayer
        gameGrid[index] = currentPlayer
        count+=1
        swapTurn();
        checkGameOver();
    }
}   

function swapTurn(){
    if(currentPlayer ==="X"){
        currentPlayer = "O"
    }
    else{
        currentPlayer = "X"
    }
    gameInfo.innerText = `Current player - ${currentPlayer}`
}

function checkGameOver(){
    let answer = "";

    winningPos.forEach((position)=>{
        if(( gameGrid[position[0]]!=="" || gameGrid[position[1]]!=="" || gameGrid[position[2]]!=="") 
        && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]]===gameGrid[position[2]]) ){

            if(gameGrid[position[0]]==='X'){
                gameInfo.innerText = `Winner is X`
            }
            else{
                gameInfo.innerText = `Winner is O`
            }

            boxes[position[0]].classList.add("win")
            boxes[position[1]].classList.add("win")
            boxes[position[2]].classList.add("win")
            btn.classList.add("active")
        }
        else if(count >= 9){
            gameInfo.innerText = `NO RESULT`;
            btn.classList.add("active")
        }
    })
    
    // boxes.forEach((box)=>{
    //     box.removeEventListener('click',handleClick(index) , false)
    // })

}


btn.addEventListener('click',() =>{
    if(btn.classList.contains("active")){
        initGame();
    }
})
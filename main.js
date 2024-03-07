const playerName = document.querySelector("#player-name");
const board = document.querySelector(".board");
const cells = document.querySelectorAll(".cell"); // Changed to querySelectorAll
const winnerMessage = document.querySelector("#winner-message");
const reset = document.querySelector("#reset");

let boardArray = ['', '', '', '', '', '', '', '', ''];

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

let witchPlayerTurn = Math.random() > .5 ? "X" : "O";
playerName.textContent = witchPlayerTurn;
board.dataset.playerActive = witchPlayerTurn;

setOnClickForCells();

function setOnClickForCells() {
    cells.forEach((cell, index) => {
        cell.onclick = () => { // Changed to onclick
            if (boardArray[index] === "") {
                cell.classList.add(witchPlayerTurn);
                boardArray[index] = witchPlayerTurn;
                let gameState = checkGameState();
                console.log(gameState);
                if (gameState === 1) {
                    winnerMessage.innerHTML = `<h3>${witchPlayerTurn} is the winner of the game </h3>`
                    removeOnClickFromCells();
                } else if (gameState === -1) {
                    winnerMessage.innerHTML = `<h3>The game is finished and there is no winner! </h3>`
                } else {
                    witchPlayerTurn = witchPlayerTurn === "X" ? "O" : "X"
                    playerName.textContent = witchPlayerTurn
                }
            }
        }
    })
}

reset.onclick = () => { // Changed to onclick
    boardArray = ['', '', '', '', '', '', '', '', ''];
    witchPlayerTurn = Math.random() > .5 ? "X" : "O";
    playerName.textContent = witchPlayerTurn;
    board.dataset.playerActive = witchPlayerTurn; 
    cells.forEach(cell => {
        cell.classList.remove("X");
        cell.classList.remove("O");
    })
    winnerMessage.innerHTML = ``
    setOnClickForCells()
}

function checkGameState() {
    for (condition of winningConditions) {
        console.log(boardArray);
        console.log(condition);
        if (boardArray[condition[0]] === boardArray[condition[1]] &&
            boardArray[condition[1]] === boardArray[condition[2]] &&
            boardArray[condition[0]] !== "") {
            return 1
            }
    }

    for (cell of boardArray) {
        if (cell === "") {
            return 0
        }
    }
    
    return -1
}

function removeOnClickFromCells() {
    cells.forEach(cell => {
        cell.onclick = ""; // Changed to onclick
    })
}

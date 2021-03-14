// Document object model
let gameActive = true
let currentPlayer = "X"
let gameState = ["","","","","","","","",""]

document.querySelector('.game-status').innerHTML=`It's ${currentPlayer}'s turn`

winningConditions=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

document.querySelector(".game-restart").addEventListener('click', handleRestartGame)

document.querySelectorAll(".cell").forEach(cell => cell.addEventListener('click', handleCellClick))

function handleCellClick(elementClickedEvent) {
    // get box id
    let clickedCell = elementClickedEvent.target
    clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'))

    // return if slot is already filled or game is over
    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    gameState[clickedCellIndex] = currentPlayer
    clickedCell.innerHTML = currentPlayer

    // do validation
    handleResultValidation()
}

function handleResultValidation() {
    let isGameOver = false

    for (let i=0; i <= 7; i++) {
        winCondition=winningConditions[i]
        let a = gameState[winCondition[0]]
        let b = gameState[winCondition[1]]
        let c = gameState[winCondition[2]]

        if (a === '' || b === '' || c === '') {
            continue;
        }

        if (a===b && b===c) {
            isGameOver = true
            break
        }
    }

    if (isGameOver) {
        document.querySelector(".game-status").innerHTML=`${currentPlayer} has won the game!`
        gameActive = false
        return
    }

    let isGameDrawn = !gameState.includes("")

    if (isGameDrawn) {
        document.querySelector(".game-status").innerHTML="Game Drawn"
        gameActive = false
        return
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X'
    document.querySelector('.game-status').innerHTML=`It's ${currentPlayer}'s turn`
}

function handleRestartGame() {
    gameActive = true
    currentPlayer = "X"
    gameState = ["","","","","","","","",""]

    document.querySelector('.game-status').innerHTML=`It's ${currentPlayer}'s turn`
    document.querySelectorAll('.cell').forEach(divElementCell => divElementCell.innerHTML="")
}
//creates gameboard
const gameBoard = (function() {
    //fills gameboard 3 x 3
    //for some reason new array.fill doesnt work
    // const board = new Array(3).fill(new Array(3).fill(null));
    let board = [];
    let i = 0;
    while(i < 3) {
        board.push([null, null,null])
        i++;
    }

    const resetBoard = () => {
        let i = 0;
        while(i < 3) {
            board[i] = [null, null, null]
            i++;
        }
        return board
    }
    return {board, resetBoard};
})();

//creates User
function User (name, position) {
    const userName = name;
    const userPosition = position

    return {userName, userPosition}
}

//creates the flow of game??????
const displayController = (function (playerOne = "You", playerTwo = "Comp", position = 'X', positionTwo = 'O') {
    let board = gameBoard.board;
    const player = User(playerOne, position);
    const comp = User(playerTwo, positionTwo);

    const getBoard = () => board;
    let turnCount = 0;
    let compTurn = false;

    //check winner or tie
    const checkWinner = () => {
        //check if rows are all the same
        for(let i = 0; i < 3; i++) {
            //checks if not null and if all of them have the same value
            if(board[i][0] != null && board[i][0] === 'X' && board[i][0] === board[i][1] && board[i][0] === board[i][2]) return true;
        }
        //checks columns
        for(let i = 0; i < 3; i++) {
            //checks if not null and if all of them have the same value
            if(board[0][i] != null && board[0][i] === 'X' && board[0][i] === board[1][i] && board[0][i] === board[2][i]) return true;
        }
        //checks diagnols
        if(board[1][1] != null && board[1][1] === 'X') {
            if(board[0][0] === board[1][1] && board[1][1] === board[2][2]) return true;
            else if (board[0][2] === board[1][1] && board[1][1] === board[2][0]) return true;
        }
        return false;
    }

    //check if you lost
    const checkLost = () => {
        //check if rows are all the same
        for(let i = 0; i < 3; i++) {
            //checks if not null and if all of them have the same value
            if(board[i][0] != null && board[i][0] === 'O' && board[i][0] === board[i][1] && board[i][0] === board[i][2]) return true;
        }
        //checks columns
        for(let i = 0; i < 3; i++) {
            //checks if not null and if all of them have the same value
            if(board[0][i] != null && board[0][i] === 'O' && board[0][i] === board[1][i] && board[0][i] === board[2][i]) return true;
        }
        //checks diagnols
        if(board[1][1] != null && board[1][1] === 'O') {
            if(board[0][0] === board[1][1] && board[1][1] === board[2][2]) return true;
            else if (board[0][2] === board[1][1] && board[1][1] === board[2][0]) return true;
        }
        return false;
    }

    //player chooses where to place X
    const playerChoice = (x,y) => {
        if(board[x][y] === null) {
            board[x][y] = 'X';
            //AI runs its turn right after you
            if(turnCount < 4) {
                compTurn = true;
                compChoice();
            };
            return true;
        } else {
            return false
        }
    };

    //computer choice
    const compChoice = () => {
        let computer = () => {
            //get random number for the board
            let x = Math.floor(Math.random() * 3);
            let y = Math.floor(Math.random() * 3);
            //place board if null
            if(board[x][y] === null) {
                board[x][y] = 'O';
                compTurn = false;
            }
        }
        //runs computer function to place on board until its not the computers turn anymore
        while(compTurn) {
            computer();
        }
    };

    return {player, comp, playerChoice, getBoard, compChoice, checkWinner, turnCount, checkLost}
})();

//show tic-tac-toe board
function showGame () {
    let board = gameBoard.board;
    const content = document.querySelector('.game-content');
    board.forEach((el,x) => {
        el.forEach((box, y) => {
            const item = document.createElement('div');
            item.classList.add('itemContent');
            if(box != null) {
                item.textContent = `${box}`
            }
            if(!displayController.checkWinner() && !displayController.checkLost()) {
                item.addEventListener('click', function() {
                    console.log(displayController.playersTurn)
                    console.log(displayController.compTurn)
                    if(displayController.playerChoice(x,y)) {
                        displayController.playerChoice(x,y);
                        displayController.turnCount++;
                        replaceContent();
                        console.log('broken?')
                    }
                    console.log(board)
                    console.log('working')
                });
            }
            content.appendChild(item);
        })
    });

    if(displayController.turnCount >= 3) {
        const resultContainer = document.querySelector('.game-result');
        if(displayController.checkWinner()) {
            resultContainer.textContent = 'You Win';
        } else if(displayController.turnCount >= 6) {
            resultContainer.textContent = 'Tie game';
        } else if (displayController.checkLost()) {
            resultContainer.textContent = 'You Lose';
        }
    }
};

//replace board with accurate outputs
const replaceContent = () => {
    const content = document.querySelector(".game-content");
    // console.log(items)

    while(content.firstChild) {
        content.removeChild(content.firstChild);
    }

    showGame();
}

//restart game
const buttonRestart = () => {
    const resultContainer = document.querySelector('.game-result');
    gameBoard.resetBoard();
    displayController.turnCount = 0;
    resultContainer.textContent = '';
    // displayController.playersTurn = true;
    replaceContent();
}

showGame();

//creates gameboard
const gameBoard = (function() {
    //fills gameboard 3 x 3
    //for some reason new array.fill doesnt work
    // const board = new Array(3).fill(new Array(3).fill(null));
    let board = [];
    let i = 0;
    while(i < 3) {
        board.push(['x', 'x', 'x'])
        i++;
    }
    return board;
})();

//creates User
function User (name, position) {
    const userName = name;
    const userPosition = position

    return {userName, userPosition}
}

//creates the flow of game??????
const displayController = (function (playerOne = "You", playerTwo = "Comp", position = 'X', positionTwo = 'O') {
    let board = gameBoard;
    const player = User(playerOne, position);
    const comp = User(playerTwo, positionTwo);

    const getBoard = () => board;
    let playersTurn = true;
    let compTurn = false;
    let turnCount = 0;

    //check winner or tie
    const checkWinner = () => {
        //check if rows are all the same
        for(let i = 0; i < 3; i++) {
            //checks if not null and if all of them have the same value
            if(board[i][0] != null && board[i][0] === board[i][1] && board[i][0] === board[i][2]) console.log('You Win');
        }
        //checks columns
        for(let i = 0; i < 3; i++) {
            //checks if not null and if all of them have the same value
            if(board[0][i] != null && board[0][i] === board[1][i] && board[0][i] === board[2][i]) console.log('You Win');
        }
        //checks diagnols
        if(board[1][1] != null) {
            if(board[0][0] === board[1][1] && board[1][1] === board[2][2]) console.log('You Win');
            else if (board[0][2] === board[1][1] && board[1][1] === board[2][0]) console.log('You Win');
        }
        if(turnCount === 5) console.log('Tie game!')
        // return false;
    }

    //player chooses where to place X
    const playerChoice = (x,y) => {
        if(playersTurn) {
            if(board[x][y] === null) {
                board[x][y] = 'X';
                turnCount++;
                if(turnCount >= 3) {
                    checkWinner();
                }
                playersTurn = false;
                compTurn = true;
            } else console.log('Bruh')
        } else {
            //AI sends message and runs its turn
            console.log('AI: "Ayyy yooo its my turn"')
            compChoice();
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
                board[x][y] = 'O'
                //return it back to players turns
                playersTurn = true;
                compTurn = false
            }
        }
        //runs computer function to place on board until its not the computers turn anymore
        while(compTurn) {
            computer();
        }
    };

    return {player, comp, playerChoice, getBoard, compChoice}
})();

//show tic-tac-toe board
// function showGame () {
//     let board = gameBoard;
//     const content = document.querySelector('.game-content');
//     console.log(board)
//     board.forEach((el, i) => {
//         console.log(el, i)
//         const item = document.createElement('div');
//         item.classList.add('itemContent');
//         console.log(item)
//         content.appendChild(item);
//     })
// }

// showGame();

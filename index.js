//creates gameboard
const gameBoard = (function() {
    //fills gameboard 3 x 3
    //for some reason new array.fill doesnt work
    // const board = new Array(3).fill(new Array(3).fill(null));
    let board = [];
    let i = 0;
    while(i < 3) {
        board.push([null, null, null])
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

    //player chooses where to place X
    const playerChoice = (x,y) => {
        if(playersTurn) {
            if(board[x][y] === null) {
                board[x][y] = 'X';
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

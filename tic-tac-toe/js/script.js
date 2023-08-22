class player{
    constructor(
        playerName = '',
        playerMarker = ''
    )
    {
        this.playerName = playerName;
        this.playerMarker = playerMarker;
    }
}

const Cell = () => {
    let value = ' ';

    const addMarker = (player) => {
        value = player;
    }

    const getValue = () => value;

    return {addMarker, getValue}
}

const gameBoard = (() => {
    let board = [];

    for(let i=0; i<3; i++){
        board[i] = [];
        for(let j=0; j<3; j++){
            board[i].push(Cell());
        }
    }

    const getBoard = () => board;

    const placeMarker = (x,y, player) => {

        if(board[x][y].getValue() !== ' ')return null;
        board[x][y].addMarker(player);
    }

    const printBoard = () => {
        const boardWithCellValues = board.map((x) => x.map((cell) => cell.getValue()))
        console.log(boardWithCellValues);
    };

    return {getBoard, placeMarker, printBoard}
})();

const displayController = (() => {
    const App = document.getElementById('App');
    const injectBoard = () => {
        let html = ''
        for(let i=0; i<3; i++){
            for(let j=0; j<3; j++){
                html += "<button onclick='game.playRound(event)' data-row="+i+" data-col="+j+"> </button>"
            }
        }
        App.innerHTML = html;
    }
    return {injectBoard}
})();

const  GameController = (()=> {
    const board = gameBoard;

    board.printBoard();
    displayController.injectBoard();

    const players = [
        new player('Player 1', 'X'),
        new player('Player 2', 'O')
    ];

    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0]? players[1]: players[0];
    }

    const getActivePlayer = () =>{  return activePlayer};

    const printNewRound = (e) => {
        board.printBoard();
        const title = e.target;
        console.log(getActivePlayer())
        title.innerHTML = getActivePlayer().playerMarker;
    };

    const playRound = (e) => {
        const row = e.target.dataset.row;
        const col = e.target.dataset.col;
        board.placeMarker(row,col, getActivePlayer().playerMarker)=== null?
            null
            :printNewRound(e) + switchPlayerTurn();
    }

    return {playRound}
})();


const game = GameController;
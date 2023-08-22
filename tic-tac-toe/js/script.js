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
        // console.log(boardWithCellValues);
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
        title.innerHTML = getActivePlayer().playerMarker;
    };

    const checkRows = () =>{
        for(let i=0; i<3; i++){
            
            let row = [];
            for(let j=0; j<3; j++){
                row.push(board.getBoard()[i][j].getValue());
            }
            if(row.every(cell => cell === 'X') || row.every(cell => cell === 'O')){
                return true;
            }
        }
        return;
    }
    const checkCols = () => {
        for(let i=0; i<3; i++){
            let col = [];
            for(let j=0; j<3; j++){
                col.push(board.getBoard()[j][i].getValue());
            }
            if(col.every(cell => cell === 'X') || col.every(cell => cell === 'O')){
                return true;
            }
        }
        return;
    }

    const checkDiag = () => {
        let diag1 = [];
        let diag2 = [];
        for(let i=0; i<3;i++){
            for(let j=0;j<3;j++){
                if(i===j){
                    diag1.push(board.getBoard()[i][j].getValue());
                }
                if((i===0 && j===2)||(i===2 && j===0)||(i===1 && j===1)){
                    diag2.push(board.getBoard()[i][j].getValue());
                }
            }
        }
        if(diag1.every(cell => cell === 'X') || diag1.every(cell => cell === 'O')){
            return true;
        }
        if(diag2.every(cell => cell === 'X') || diag2.every(cell => cell ==='O')){
            return true;
        }
    }

    const winConditions = () => {
    }

    const playRound = (e) => {
        const row = e.target.dataset.row;
        const col = e.target.dataset.col;
        board.placeMarker(row,col, getActivePlayer().playerMarker)=== null?
            null
            :printNewRound(e) + switchPlayerTurn();
        checkRows();
        checkCols();
        checkDiag();
        }
    return {playRound}
})();


const game = GameController;
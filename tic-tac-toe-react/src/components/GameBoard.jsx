import { useEffect, useState } from "react";
import Tile from "./Tile";
import WinModalComp from "./WinModal";
import DrawModalComp from "./DrawModal";
import { Form, FormGroup, Input, Tooltip } from "reactstrap";

const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

const initialGameState = {
    isNext: true,
    tiles: Array(9).fill(null),
    difficulty: 50
}


const GameBoard = () => {
    
    const [gameState, setGameState] = useState(initialGameState)
    const [gameOverMessage, setGameOverMessage] = useState('');
    const [showWinModal, setShowWinModal] = useState(false);
    const [showDrawModal, setShowDrawModal] = useState(false);
    const [tooltipOpen, setTooltipOpen] = useState(false);

    const toggleTip = () => setTooltipOpen(!tooltipOpen);

    const handleNewGame = () => {
        setGameState(initialGameState)
    }

    const handleMove = (i) => {
        if (gameState.tiles[i]|| calculateWinner(gameState.tiles)) return
        const newState = {...gameState}
        const nextTiles = [...gameState.tiles];
        if(gameState.isNext){
            nextTiles[i] = "X";
        }else{
            nextTiles[i] = "O";
        }
        newState.tiles = nextTiles;
        newState.isNext =!newState.isNext;
        setGameState(newState);
    }

    useEffect(()=>{
        const winner = calculateWinner(gameState.tiles);
        if(winner){
            setGameOverMessage((winner=== 'X'?'You have won!':'You have lost...'));
            setShowWinModal(!showWinModal);
            return;
        }
        if(isBoardFilled(gameState.tiles)){
            setShowDrawModal(!showDrawModal);
        }
        
    },[gameState.tiles]);

    useEffect(() =>{
        async function delayChoice(){
            await sleep(200);
            if(!gameState.isNext){
                const tilesCopy = [...gameState.tiles];
                const aiPercentage = Math.floor(Math.random()*100);

                if(gameState.difficulty>aiPercentage){
                    const bestTile = findBestMove(tilesCopy, 'O');
                if(bestTile !== -1){
                    handleMove(bestTile);
                }
                }else{
                    let availMoves = gameState.tiles.map((element, index) => element === null? index:null).filter(p=> p!=null);
                    let aiMove = availMoves[Math.floor(Math.random() * (availMoves.length))];
                    handleMove(aiMove);
                }
            }
        }
        delayChoice();
    },[gameState.isNext]);

    const handleDifficultyChange = (e) => {
        const newState = {...gameState};
        newState.difficulty = e.target.value;
        setGameState(newState);
    }

    return (
        <>
            <div className="board-wrapper">
                <div className="board-row">
                    <Tile value={gameState.tiles[0]} onTileClick={()=> handleMove(0)} />
                    <Tile value={gameState.tiles[1]} onTileClick={()=> handleMove(1)} />
                    <Tile value={gameState.tiles[2]} onTileClick={()=> handleMove(2)} />
                </div>
                <div className="board-row">
                    <Tile value={gameState.tiles[3]} onTileClick={()=> handleMove(3)} />
                    <Tile value={gameState.tiles[4]} onTileClick={()=> handleMove(4)} />
                    <Tile value={gameState.tiles[5]} onTileClick={()=> handleMove(5)} />
                </div>
                <div className="board-row">
                    <Tile value={gameState.tiles[6]} onTileClick={()=> handleMove(6)} />
                    <Tile value={gameState.tiles[7]} onTileClick={()=> handleMove(7)} />
                    <Tile value={gameState.tiles[8]} onTileClick={()=> handleMove(8)} />
                </div>
            </div>
            <h5 style={{textAlign: 'center'}}>Set Difficulty</h5>
            <Form style={{margin: '0 auto', width: '400px'}}>
                <FormGroup>
                    <Input
                        id="difficulty"
                        name="range"
                        type="range"
                        onChange={(e)=> handleDifficultyChange(e)}
                    />
                    <Tooltip
                        isOpen={tooltipOpen}
                        target='difficulty'
                        toggle={toggleTip}
                        >
                            {gameState.difficulty}
                        </Tooltip>
                </FormGroup>
            </Form>
            <WinModalComp handleNewGame={handleNewGame} gameOverMessage={gameOverMessage} showWinModal={showWinModal} setShowWinModal={setShowWinModal}/>
            <DrawModalComp handleNewGame={handleNewGame} showDrawModal={showDrawModal} setShowDrawModal={setShowDrawModal}/>
        </>
    );
};

function isBoardFilled(tiles) {
    for (let i = 0; i < tiles.length; i++) {
        if (tiles[i] === null) {
        return false;
        }
    }
    return true;
}

const sleep = ms => new Promise(
    resolve => setTimeout(resolve, ms)
);

const calculateWinner = (tiles) => {
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (tiles[a] && tiles[a] === tiles[b] && tiles[a] === tiles[c]) {
            return tiles[a];
        } 
    }
return null;
}

function findBestMove(tiles, player){
    const opponenet = player === 'x'? 'O': 'X';

    const minimax = (tiles, isMax) =>{
        const winner = calculateWinner(tiles);
        if(winner === player) return {tile: -1, score:1};

        if(winner === opponenet) return {tile:-1, score:-1};

        if(isBoardFilled(tiles)) return {tile: -1, score: 0};

        const best = {tile: -1, score: isMax? -1000 : 1000};

        for(let i=0;i<tiles.length; i++){
            if(tiles[i]){
                continue;
            }
        
            tiles[i] = isMax ? player:opponenet;

            const score = minimax(tiles, !isMax).score;

            tiles[i] = null;

            if(isMax){
                if(score > best.score){
                    best.score = score;
                    best.tile = i;
                }
            } else {
                if(score < best.score) {
                    best.score = score;
                    best.tile = i;
                }
            }
        }
        return best;
    };
    return minimax(tiles,true).tile;
}

export default GameBoard
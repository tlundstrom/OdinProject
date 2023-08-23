import { useEffect, useState } from "react";
import Tile from "./Tile";
import WinModal from "./Modal";

const GameBoard = (props) => {
    const [isNext, setIsNext] = useState(true);
    const [tiles, setTiles] = useState(Array(9).fill(null));
    const [winner, setWinner] = useState('');
    const [modal, setModal] = useState(false);

    const handleNewGame = () => {
        setIsNext(true);
        setTiles(Array(9).fill(null));
        setWinner('');
    }

    const handleClick = (i) => {
        if (tiles[i]|| calculateWinner(tiles)) {return}
        const nextTiles = tiles.slice();
        if(isNext){
            nextTiles[i] = "X";
        }else{
            nextTiles[i] = "O";
        }
        setIsNext(!isNext)
        setTiles(nextTiles);
    }
    useEffect(()=>{
        if(calculateWinner(tiles)){
            setWinner(calculateWinner(tiles));
            setModal(!modal);
        }
    },[tiles]);

    useEffect(() =>{
        if(!isNext){
            //dumb placement
            let availMoves = [];
            for(let i=0;i<tiles.length-1; i++){
                if(tiles[i] === null){
                    availMoves.push(i);
                }
            }
            let aiMove = availMoves[Math.floor(Math.random() * (availMoves.length + 1))];
            
            handleClick(aiMove);
        }
    },[isNext]);

    return (
        <>
            <div className="board-wrapper">
                <div className="board-row">
                    <Tile value={tiles[0]} onTileClick={()=> handleClick(0)} />
                    <Tile value={tiles[1]} onTileClick={()=> handleClick(1)} />
                    <Tile value={tiles[2]} onTileClick={()=> handleClick(2)} />
                </div>
                <div className="board-row">
                    <Tile value={tiles[3]} onTileClick={()=> handleClick(3)} />
                    <Tile value={tiles[4]} onTileClick={()=> handleClick(4)} />
                    <Tile value={tiles[5]} onTileClick={()=> handleClick(5)} />
                </div>
                <div className="board-row">
                    <Tile value={tiles[6]} onTileClick={()=> handleClick(6)} />
                    <Tile value={tiles[7]} onTileClick={()=> handleClick(7)} />
                    <Tile value={tiles[8]} onTileClick={()=> handleClick(8)} />
                </div>
            </div>
            <WinModal handleNewGame={handleNewGame} winner={winner} modal={modal} setModal={setModal}/>
        </>
    );
};

const calculateWinner = (tiles) => {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (tiles[a] && tiles[a] === tiles[b] && tiles[a] === tiles[c]) {
            return tiles[a];
        } 
    }
return null;
}


export default GameBoard
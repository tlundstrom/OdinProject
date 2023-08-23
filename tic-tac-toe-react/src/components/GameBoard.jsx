import Tile from "./Tile";

const GameBoard = (props) => {

    return (
        <div className="board-wrapper">
            <div className="board-row">
                <Tile />
                <Tile />
                <Tile />
            </div>
            <div className="board-row">
                <Tile />
                <Tile />
                <Tile />
            </div>
            <div className="board-row">
                <Tile />
                <Tile />
                <Tile />
            </div>
        </div>
    );
};

export default GameBoard
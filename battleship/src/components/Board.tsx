import styled from "styled-components";
import Gameboard from "../utilities/Gameboard";
import Player from "../utilities/Player";

interface IProps {
  gameboard: Gameboard;
  owner: Player;
  enemy: Player;
  onCellClick?: (x: number, y: number) => void;
}

export default function Board({ gameboard, owner, enemy, onCellClick }: IProps) {
  const loadCells = () => {
    const cells = [];
    for (let i = 0; i < gameboard.board.length; i++) {
      for (let j = 0; j < gameboard.board[i].length; j++) {
        const cell = gameboard.board[j][i];
        let status = "default";
        if (cell) {
          if (owner.name !== "cpu") status = "ship";
          if (enemy.hasHit(j, i)) status = "hit";
        } else {
          if (gameboard.misses[j][i]) status = "miss";
        }
        let cellComp = <Cell></Cell>;
        if (owner.name === "cpu") {
          cellComp = <Cell key={`${owner}[${i},${j}]`} status={status} owner={owner} onClick={() => onCellClick!(j, i)} />;
        } else {
          cellComp = <Cell key={`${owner}[${i},${j}]`} status={status} owner={owner} />;
        }
        cells.push(cellComp);
      }
    }
    return cells;
  };
  return (
    <>
      <BoardWrapper>{loadCells()}</BoardWrapper>
    </>
  );
}

const BoardWrapper = styled.div`
  display: grid;
  width: 40rem;
  height: 40rem;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(10, 1fr);
  border: 1px solid ivory;
`;

interface ICell {
  status?: string;
  owner?: Player;
}

const Cell = styled.div<ICell>`
  border: 1px solid ivory;
`;

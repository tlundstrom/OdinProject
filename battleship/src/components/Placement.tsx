import { useState, useEffect } from "react";
import styled, { css } from "styled-components";

import { v4 as uuidv4 } from "uuid";
import Gameboard from "../utilities/Gameboard";
import Ship from "../utilities/Ship";

interface Props {
  playerBoard: Gameboard;
  setPlayerBoard: (newPlayerboard: Gameboard) => void;
  setGameStart: (gameStart: boolean) => void;
}

const Placement = ({ playerBoard, setPlayerBoard, setGameStart }: Props) => {
  const ships = [new Ship("carrier"), new Ship("battleship"), new Ship("cruiser"), new Ship("submarine"), new Ship("destroyer")];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentShip, setCurrentShip] = useState(ships[0]);
  const [isVertical, setIsVertical] = useState(false);
  const [currentShipName, setCurrentShipName] = useState(currentShip?.name || "");

  const toggleRotate = () => {
    setIsVertical(!isVertical);
  };

  useEffect(() => {
    setCurrentShipName(currentShip.name);
  }, [currentShip]);

  const onFieldClick = (y: number, x: number) => {
    let gameboardCopy: Gameboard = Object.assign(Object.create(Object.getPrototypeOf(playerBoard)), playerBoard);

    if (!gameboardCopy.isPossible(currentShip, y, x, isVertical)) {
      return;
    }

    gameboardCopy.place(currentShip, y, x, isVertical);
    setPlayerBoard(gameboardCopy);
    setCurrentIndex(currentIndex + 1);
    if (currentIndex < 4) {
      setCurrentShip(ships[currentIndex + 1]);
    }

    if (currentIndex > 3) {
      setGameStart(true);
    }
  };

  const loadFields = () => {
    const fields = [];
    for (let y = 0; y < playerBoard.board.length; y++) {
      for (let x = 0; x < playerBoard.board[y].length; x++) {
        fields.push(
          <Field key={uuidv4()} isFilled={playerBoard.board[y][x] ? true : false} onClick={() => onFieldClick(y, x)}>
            <FieldHover shipLength={currentShip.length} isVertical={isVertical} />
          </Field>
        );
      }
    }
    return fields;
  };

  return (
    <>
      <StartScreenWrapper>
        <SetupWindow>
          <p>
            <strong>Battleship</strong>
          </p>
          <p>Place your {currentShipName}</p>
          <button onClick={toggleRotate}>Rotate</button>
          <Board>{loadFields()}</Board>
        </SetupWindow>
        <Overlay />
      </StartScreenWrapper>
    </>
  );
};

const StartScreenWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  font-size: 2.5rem;
`;

const SetupWindow = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 40rem;
  height: 60rem;
  padding: ;
  background-color: lightBlue;
`;

const Board = styled.div`
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(10, 3rem);
  grid-template-rows: repeat(10, 3rem);
`;

interface IField {
  isFilled: boolean;
}

const Field = styled.div<IField>`
  border: 0.1rem solid black;
  cursor: pointer;

  ${({ isFilled }) =>
    isFilled &&
    css`
      background-color: darkGray;
    `}
`;

interface IFieldHover {
  shipLength: number;
  isVertical: boolean;
}

const FieldHover = styled.div<IFieldHover>`
  position: relative;
  height: 3rem;
  width: 3rem;

  &:hover {
    background-color: gray;

    ${({ isVertical, shipLength }) =>
      isVertical &&
      css`
        height: calc(3rem + 3rem * ${shipLength - 1});
      `}

    ${({ isVertical, shipLength }) =>
      !isVertical &&
      css`
        width: calc(3rem + 3rem * ${shipLength - 1});
      `}
  }
`;
const Overlay = styled.div`
  position: absolute;
  z-index: 1;
  top: 0;
  right: 0;
  height: 100%;
  width: 100%;
  background-color: black;
  opacity: 0.6;
`;

export default Placement;

import { useEffect, useState } from "react";

import Gameboard from "../utilities/Gameboard";
import Player from "../utilities/Player";
import styled from "styled-components";
import Board from "./Board";
import Placement from "./Placement";
import GameOver from "./GameOver";
import { createSeekStack } from "../utilities/battleshipAI";

export default function Game() {
  const [player, setPlayer] = useState(new Player("player"));
  const [playerBoard, setPlayerBoard] = useState(new Gameboard());
  const [cpu, setCpu] = useState(new Player("cpu"));
  const [cpuBoard, setCpuBoard] = useState(new Gameboard());
  const [gameOverMSG, setGameOverMSG] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [gameStart, setGameStart] = useState(false);

  useEffect(() => {
    createCpuBoard();
  }, []);

  const createCpuBoard = () => {
    const newBoard = new Gameboard();
    newBoard.randomize();
    setCpuBoard(newBoard);
  };

  createSeekStack();

  const handleCellClick = (x: number, y: number) => {
    if (player.hasHit(x, y)) return;

    let playerCopy: Player = Object.assign(Object.create(Object.getPrototypeOf(player)), player);
    let cpuCopy: Player = Object.assign(Object.create(Object.getPrototypeOf(cpu)), cpu);
    let playerBoardCopy = Object.assign(Object.create(Object.getPrototypeOf(playerBoard)), playerBoard);
    let cpuBoardCopy = Object.assign(Object.create(Object.getPrototypeOf(cpuBoard)), cpuBoard);

    playerCopy.attack(x, y, cpuBoardCopy);
    setPlayer(playerCopy);
    setCpuBoard(cpuBoardCopy);
    if (cpuBoard.handleGameOver()) {
      setGameOverMSG("You've Won!");
      setGameOver(true);
      return;
    }

    cpuCopy.cpuAttack(playerBoardCopy);
    setCpu(cpuCopy);
    setPlayerBoard(playerBoardCopy);
    if (playerBoard.handleGameOver()) {
      setGameOverMSG("You've Lost!");
      setGameOver(true);
      return;
    }
  };

  const newGame = () => {
    setPlayer(new Player("player"));
    setPlayerBoard(new Gameboard());
    setCpu(new Player("cpu"));
    createCpuBoard();
    setGameOverMSG("");
    setGameOver(false);
    setGameStart(false);
  };

  return (
    <>
      {gameStart ? "" : <Placement setGameStart={setGameStart} playerBoard={playerBoard} setPlayerBoard={setPlayerBoard} />}
      {gameOver ? <GameOver gameOverMSG={gameOverMSG} newGame={newGame} /> : ""}
      <Boards>
        <Board gameboard={playerBoard} owner={player} enemy={cpu} />
        <Board gameboard={cpuBoard} owner={cpu} enemy={player} onCellClick={handleCellClick} />
      </Boards>
    </>
  );
}

const Boards = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5rem;
`;

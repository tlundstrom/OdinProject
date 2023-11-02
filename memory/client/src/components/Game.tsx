import { useEffect, useState } from "react";
import { ICard } from "../interfaces/Interfaces";
import CardArea from "./CardArea";
import ScoreArea from "./ScoreArea";

const Game = () => {
  const [cards, setCards] = useState<ICard[]>([]);
  const [currentScore, setCurrentScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(0);
  const [stack, setStack] = useState<string[]>([]);

  const fetchAndSetData = async () => {
    const response = await fetch("http://localhost:3030/api/cards");
    const data = await response.json();
    setCards(await data);
  };
  useEffect(() => {
    fetchAndSetData();
  }, []);
  return (
    <div className="game-wrapper">
      <ScoreArea highScore={highScore} currentScore={currentScore} />
      <CardArea
        cards={cards}
        currentScore={currentScore}
        setCurrentScore={setCurrentScore}
        stack={stack}
        setStack={setStack}
        highScore={highScore}
        setHighScore={setHighScore}
      />
    </div>
  );
};

export default Game;

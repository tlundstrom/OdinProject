import { useEffect, useState } from "react";
import { ICard } from "../interfaces/Interfaces";
import { Card } from "./Card";
import GameControls from "./GameControls";
import { flipCard } from "../Utilities/GameLogic";

interface IProps {
  cards: ICard[];
  stack: string[];
  setStack: (newStack: string[]) => void;
  currentScore: number;
  setCurrentScore: (newScrore: number) => void;
  highScore: number;
  setHighScore: (newScore: number) => void;
}
const initialDeck: ICard[] = [
  {
    _id: "",
    id: "",
    name: "",
    subtypes: [""],
    level: "",
    types: [""],
    evolvesFrom: "",
    abilities: [
      {
        name: "",
        text: "",
        type: "",
      },
    ],
    attacks: [{ name: "", cost: [""], convertedEndergyCost: 0, damage: "", text: "" }],
    weaknesses: [{ type: "", value: "" }],
    retreatCost: [""],
    convertedRetreatCost: 0,
    number: "",
    artist: "",
    rarity: "",
    flavorText: "",
    nationalPokedexNumbers: [0],
    legalities: { unlimited: "" },
    images: { small: "", large: "" },
  },
];
export default function CardArea({ cards, stack, setStack, currentScore, setCurrentScore, highScore, setHighScore }: IProps) {
  const [deck, setDeck] = useState<ICard[]>(initialDeck);
  const [difficultyText, setDifficultyText] = useState<string>("");
  const [difficulty, setDifficulty] = useState<number>(3);
  const [dialog, setDialog] = useState<string>("");
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    switch (difficulty) {
      case 1:
        setDifficultyText("10 Card Memory");
        break;
      case 2:
        setDifficultyText("15 Card Memory");
        break;
      case 3:
        setDifficultyText("20 Card Memory");
        break;
      case 4:
        setDifficultyText("25 Card Memory");
        break;
      case 5:
        setDifficultyText("30 Card Memory");
        break;
    }
  }, [difficulty]);

  const getRandomCard = () => {
    let number: number = Math.floor(Math.random() * 69) + 1;
    return cards[number];
  };
  const buildDeck = () => {
    let newDeck: ICard[] = [];
    for (let i = 0; i < 5; i++) {
      newDeck.push(getRandomCard());
    }
    setDeck(newDeck);
  };
  useEffect(() => {
    buildDeck();
  }, [cards]);

  const handleGameStart = () => {
    flipCard();
    setGameStarted((prevState) => !prevState);
  };

  return (
    <>
      <div className="deck">
        {deck[0] &&
          deck.map((card, index) => {
            return (
              <Card
                key={card.id + index}
                deck={deck}
                stack={stack}
                setStack={setStack}
                currentScore={currentScore}
                setCurrentScore={setCurrentScore}
                card={card}
                index={index}
                buildDeck={buildDeck}
                flipCard={flipCard}
                highScore={highScore}
                setHighScore={setHighScore}
                difficulty={difficulty}
                gameStarted={gameStarted}
                setGameStarted={setGameStarted}
                setDialog={setDialog}
              />
            );
          })}
      </div>
      <GameControls
        dialog={dialog}
        difficultyText={difficultyText}
        difficulty={difficulty}
        setDifficulty={setDifficulty}
        handleGameStart={handleGameStart}
        gameStarted={gameStarted}
      />
    </>
  );
}

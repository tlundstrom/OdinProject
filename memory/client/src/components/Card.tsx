import { handleGameOver, isGameOver } from "../Utilities/GameLogic";
import { ICard } from "../interfaces/Interfaces";

interface IProps {
  deck: ICard[];
  stack: string[];
  setStack: (newStack: string[]) => void;
  currentScore: number;
  setCurrentScore: (newScrore: number) => void;
  card: ICard;
  index: number;
  buildDeck: () => void;
  flipCard: () => void;
  highScore: number;
  setHighScore: (newHighScore: number) => void;
  difficulty: number;
  gameStarted: boolean;
  setGameStarted: (prevState: boolean) => void;
  setDialog: (text: string) => void;
}

export function Card({
  stack,
  setStack,
  currentScore,
  setCurrentScore,
  card,
  index,
  flipCard,
  buildDeck,
  highScore,
  setHighScore,
  difficulty,
  gameStarted,
  setGameStarted,
  setDialog,
}: IProps) {
  const handleClick = () => {
    const cards = document.querySelectorAll(".cardBack");
    cards.forEach((card) => {
      card.setAttribute("disabled", "true");
    });

    flipCard();
    if (isGameOver(card.id, stack, difficulty)) {
      setStack([]);
      handleGameOver(currentScore, highScore, setCurrentScore, setHighScore, setGameStarted, setDialog);
    } else {
      setStack([...stack, card.id]);
      const newScore = currentScore + 1;
      setCurrentScore(newScore);
      setTimeout(buildDeck, 800);
      setTimeout(flipCard, 900);
    }
  };

  return (
    <>
      {gameStarted ? (
        <div className="mainContainer">
          <div className="card" id={`${card.id}${index}`}>
            <div className="cardFront"></div>
            <button className="cardBack" onClick={handleClick} style={{ backgroundImage: `url(${card.images.small})` }}></button>
          </div>
        </div>
      ) : (
        <div className="mainContainer">
          <div className="card" id={`${card._id}${index}`}>
            <div className="cardFront"></div>
            <div className="cardBack" style={{ backgroundImage: `url(${card.images.small})` }}></div>
          </div>
        </div>
      )}
    </>
  );
}

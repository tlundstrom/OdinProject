export function compareScores(highScore: number, currentScore: number) {
  return currentScore > highScore ? currentScore : highScore;
}
export function flipCard() {
  document.querySelectorAll(".card").forEach((el) => el.classList.toggle("flipCard"));
}

export function handleGameOver(
  currentScore: number,
  highScore: number,
  setCurrentScore: (newScore: number) => void,
  setHighScore: (newScore: number) => void,
  setGameStarted: (preState: boolean) => void,
  setDialog: (text: string) => void
) {
  setDialog(
    compareScores(highScore, currentScore)
      ? `You beat the highscore by ${currentScore - highScore}!
      Play Again?`
      : `You were ${highScore - currentScore} away from the high score! Try Again!`
  );
  setHighScore(compareScores(highScore, currentScore));
  setGameStarted(false);
  setCurrentScore(0);
  setGameStarted(false);
}

export function isGameOver(clickedId: string, stack: string[], difficulty: number) {
  switch (difficulty) {
    case 1:
      if (stack.length === 0) return false;
      if (stack.length < 10) {
        for (let i = 0; i < stack.length; i++) {
          if (clickedId === stack[i]) return true;
        }
        return false;
      } else {
        for (let i = stack.length - 1; i > stack.length - 11; i--) {
          if (clickedId === stack[i]) return true;
          return false;
        }
      }
      break;
    case 2:
      if (stack.length === 0) return false;
      if (stack.length < 15) {
        for (let i = 0; i < stack.length; i++) {
          if (clickedId === stack[i]) return true;
        }
        return false;
      } else {
        for (let i = stack.length - 1; i > stack.length - 16; i--) {
          if (clickedId === stack[i]) return true;
          return false;
        }
      }
      break;
    case 3:
      if (stack.length === 0) return false;
      if (stack.length < 20) {
        for (let i = 0; i < stack.length; i++) {
          if (clickedId === stack[i]) return true;
        }
        return false;
      } else {
        for (let i = stack.length - 1; i > stack.length - 21; i--) {
          if (clickedId === stack[i]) return true;
          return false;
        }
      }
      break;
    case 4:
      if (stack.length === 0) return false;
      if (stack.length < 25) {
        for (let i = 0; i < stack.length - 1; i++) {
          if (clickedId === stack[i]) return true;
        }
        return false;
      } else {
        for (let i = stack.length - 1; i > stack.length - 26; i--) {
          if (clickedId === stack[i]) return true;
          return false;
        }
      }
      break;
    case 5:
      if (stack.length === 0) return false;
      if (stack.length < 30) {
        for (let i = 0; i < stack.length - 1; i++) {
          if (clickedId === stack[i]) return true;
        }
        return false;
      } else {
        for (let i = stack.length - 1; i > stack.length - 31; i--) {
          if (clickedId === stack[i]) return true;
          return false;
        }
      }
      break;
  }
}

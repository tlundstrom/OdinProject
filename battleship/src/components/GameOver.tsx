import styled from "styled-components";

interface IProps {
  gameOverMSG: string;
  newGame: () => void;
}
export default function GameOver({ gameOverMSG, newGame }: IProps) {
  return (
    <EndingScreenWrapper>
      <EndingWindow>
        <h2>Game Over</h2>
        <h3>{gameOverMSG}</h3>
        <button onClick={newGame}>Play Again</button>
      </EndingWindow>
      <Overlay />
    </EndingScreenWrapper>
  );
}
const EndingScreenWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  font-size: 3rem;
`;

const EndingWindow = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 50rem;
  height: 50rem;
  padding: ;
  background-color: lightBlue;
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

interface IProps {
  currentScore: number;
  highScore: number;
}
export default function ScoreArea({ currentScore, highScore }: IProps) {
  return (
    <div style={{ color: "black", width: "100vw", height: "25vh", paddingTop: "75px" }}>
      <div className="dialog" style={{ width: "1000px", display: "flex", justifyContent: "space-evenly", margin: "0 auto" }}>
        <h2>Current Score: {currentScore}</h2>
        <h2>High Score: {highScore}</h2>
      </div>
    </div>
  );
}

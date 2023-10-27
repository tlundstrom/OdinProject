interface IProps {
  difficulty: number;
  setDifficulty: (newDifficulty: number) => void;
  difficultyText: string;
  gameStarted: boolean;

  handleGameStart: () => void;
  dialog: string;
}

const GameControls = ({ difficulty, setDifficulty, difficultyText, gameStarted, handleGameStart, dialog }: IProps) => {
  const handleDifficultyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newDifficulty = difficulty;
    newDifficulty = parseInt(e.target.value);
    setDifficulty(newDifficulty);
  };

  return (
    <div style={{ width: "100vw", display: "flex", marginTop: "5rem" }}>
      {!gameStarted && dialog.length > 0 && (
        <div
          className="dialog"
          style={{
            marginLeft: "10rem",
            width: "0",
            flexGrow: 3,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <div style={{ width: "500px" }}>{dialog}</div>
        </div>
      )}
      <div className="options" style={{ flexGrow: 2 }}>
        {!gameStarted && (
          <div
            id="options"
            style={{ display: "flex", alignItems: "center", flexDirection: "column", justifyContent: "space-evenly", height: "10rem" }}
          >
            <div className="slider" style={{}}>
              <input style={{ width: "50rem" }} type="range" min="1" max="5" value={difficulty} onChange={handleDifficultyChange} />
            </div>
            <p id="rangeValue" style={{ color: "black", display: "inline-block" }}>
              {difficultyText}
            </p>
            <div>
              <button onClick={handleGameStart}>Start Game</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameControls;

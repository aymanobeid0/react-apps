import { IAction } from "../App";

function Finish({
  points,
  maxPossiblePoints,
  dispatchRestart,
  highScore,
}: {
  points: number;
  maxPossiblePoints: number;
  dispatchRestart: React.Dispatch<IAction>;
  highScore: number;
}) {
  const percentage = (points / maxPossiblePoints) * 100;
  return (
    <>
      <p className="result">
        you scored <strong> {points}</strong> out of {maxPossiblePoints} (
        {Math.ceil(percentage)} %)
      </p>
      <p className="highscore">(Highscore: {highScore} points)</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatchRestart({ type: "restart", payload: null })}
      >
        Restart Quiz
      </button>
    </>
  );
}
export default Finish;

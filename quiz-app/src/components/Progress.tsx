function Progress({
  index,
  numOfQuestions,
  points,
  maxPossiblePoints,
  answer,
}: {
  index: number;
  numOfQuestions: number;
  points: number;
  maxPossiblePoints: number;
  answer: number | null;
}) {
  return (
    <header className="progress">
      <progress max={numOfQuestions} value={index + Number(answer !== null)} />
      <p>
        Question <strong>{index + 1}</strong> / {numOfQuestions}
      </p>
      <p>
        Points <strong>{points}</strong>/ {maxPossiblePoints}
      </p>
    </header>
  );
}

export default Progress;

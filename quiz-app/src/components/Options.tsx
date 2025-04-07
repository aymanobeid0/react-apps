import { IQuestion } from "../App";
import { IAction } from "../App";

function Options({
  question,
  dispatchAnswer,
  answer,
}: {
  question: IQuestion;
  dispatchAnswer: React.Dispatch<IAction>;
  answer: number | null;
}) {
  const hasAnswered = answer !== null;
  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          key={index}
          disabled={hasAnswered}
          className={`btn btn-option ${index === answer ? "answer" : ""}
          ${
            hasAnswered
              ? index === question.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          onClick={() => {
            dispatchAnswer({ type: "newAnswer", payload: index });
          }}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;

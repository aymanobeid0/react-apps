import { IAction } from "../App";

function NextButton({
  deispatchNextQuestion,
  answer,
  numOfQuestions,
  index,
}: {
  deispatchNextQuestion: React.Dispatch<IAction>;
  answer: number | null;
  numOfQuestions: number;
  index: number;
}) {
  if (answer === null) return null;
  if (index < numOfQuestions - 1) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => {
          deispatchNextQuestion({ type: "nextQuestion", payload: null });
        }}
      >
        Next
      </button>
    );
  }
  if (index === numOfQuestions - 1) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => {
          deispatchNextQuestion({ type: "finish", payload: null });
        }}
      >
        Finish
      </button>
    );
  }
}
export default NextButton;

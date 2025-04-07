import { IQuestion } from "../App";
import { IAction } from "../App";
import Options from "./Options";

function Question({
  question,
  dispatch,
  answer,
}: {
  question: IQuestion;
  dispatch: React.Dispatch<IAction>;
  answer: number | null;
}) {
  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} dispatchAnswer={dispatch} answer={answer} />
    </div>
  );
}
export default Question;

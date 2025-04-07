import React from "react";
import { IAction } from "../App";
function StartScreen({
  numOfQuestions,
  dispatchStart,
}: {
  numOfQuestions: number;
  dispatchStart: React.Dispatch<IAction>;
}) {
  return (
    <div className="start">
      <h2>Welcome to the quiz App</h2>
      <h3>{numOfQuestions} questions to test your react mastery</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatchStart({ type: "start", payload: [] })}
      >
        Let's Start
      </button>
    </div>
  );
}
export default StartScreen;

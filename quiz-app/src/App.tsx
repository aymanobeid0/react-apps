/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import "./index.css";
import Loader from "./components/Loader";
import ErrorComponent from "./components/ErrorComponent";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import NextButton from "./components/NextButton";
import Progress from "./components/Progress";
import Finish from "./components/Finish";
import Footer from "./components/Footer";
import Timer from "./components/Timer";

export interface IQuestion {
  question: string;
  options: string[];
  correctOption: number;
  points: number;
}
interface IState {
  questions: IQuestion[];
  status: Status;
  index: number;
  answer: null | number;
  points: number;
  highscore: number;
  secondsRemaining: number | null;
}

export interface IAction {
  type: string;
  payload: IQuestion[] | any;
}

type Status = "loading" | "active" | "error" | "ready" | "finish";
const SEC_PER_QUESTION = 30;

const initialState: IState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
};

function reducer(state: IState, action: IAction): IState {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "newAnswer": {
      const question = state.questions.at(state.index);
      // if (!question) {
      //   return state;
      // }
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question!.correctOption
            ? state.points + question!.points
            : state.points,
      };
    }
    case "nextQuestion":
      return {
        ...state,
        answer: null,
        index: state.index + 1,
      };
    case "start":
      return {
        ...state,
        secondsRemaining: state.questions.length * SEC_PER_QUESTION,
        status: "active",
      };
    case "finish":
      return {
        ...state,
        status: "finish",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "restart":
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
      };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining! - 1,
        status: state.secondsRemaining === 0 ? "finish" : state.status,
      };
    default:
      throw new Error("Unknown action");
  }
}
export default function App() {
  const [
    { questions, status, index, answer, points, highscore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);
  const numOfQuestions = questions.length;
  const maxPossiblePoints = questions.reduce((acc, cur) => acc + cur.points, 0);
  useEffect(() => {
    fetch("http://localhost:3333/questions")
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: "dataReceived", payload: data });
        console.log(data);
      })
      .catch((err) => {
        dispatch({ type: "dataFailed", payload: err.message });
        console.log(err.message);
      });
  }, []);
  return (
    <div className="App">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <ErrorComponent />}
        {status === "ready" && (
          <StartScreen
            numOfQuestions={numOfQuestions}
            dispatchStart={dispatch}
          />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numOfQuestions={numOfQuestions}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              answer={answer}
              dispatch={dispatch}
            />
            <Footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />

              <NextButton
                deispatchNextQuestion={dispatch}
                answer={answer}
                numOfQuestions={numOfQuestions}
                index={index}
              />
            </Footer>
          </>
        )}
        {status === "finish" && (
          <Finish
            points={points}
            maxPossiblePoints={maxPossiblePoints}
            dispatchRestart={dispatch}
            highScore={highscore}
          />
        )}
      </Main>
    </div>
  );
}

import { useState, useEffect } from "react";
import { QUESTIONS } from "./data/questions";
import Question from "./components/Question";


const TOTAL_TIME = 16 * 60; // 16 daqiqa

export default function App() {
  const [time, setTime] = useState(TOTAL_TIME);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [finished, setFinished] = useState(false);

  // Timer ishlashi
  useEffect(() => {
    if (finished) return;

    if (time <= 0) {
      setFinished(true);
      return;
    }

    const timer = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [time, finished]);

  const choose = (i) => setAnswers({ ...answers, [index]: i });

  const score = Object.entries(answers).reduce(
    (s, [i, v]) => s + (QUESTIONS[i]?.a === v ? 1 : 0),
    0
  );

  const level =
    score <= 10
      ? "Beginner"
      : score <= 20
        ? "Elementary"
        : score <= 30
          ? "Pre-Intermediate"
          : score <= 40
            ? "Intermediate"
            : "Advanced";

  if (finished) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="bg-white p-6 rounded-2xl shadow max-w-md w-full text-center">
          <h1 className="text-2xl font-bold mb-4">Result</h1>
          <p className="text-lg">Score: {score}</p>
          <p className="text-xl font-semibold mt-2">Level: {level}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 ">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow p-6 select-none">
        <div className="flex justify-between mb-4 text-sm text-gray-600 ">
          <span>
            Question {index + 1}/{QUESTIONS.length}
          </span>
          <span>
            ⏱ {Math.floor(time / 60)}:{String(time % 60).padStart(2, "0")}
          </span>
        </div>

        <Question
          question={QUESTIONS[index]}
          selected={answers[index]}
          choose={choose}
        />

        <div className="flex justify-between mt-6">

          <button
            onClick={() =>
              index + 1 === QUESTIONS.length
                ? setFinished(true)
                : setIndex((i) => i + 1)
            }
            className="px-4 py-2 rounded-xl bg-blue-600 text-white"
          >
            {index + 1 === QUESTIONS.length ? "Finish" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}
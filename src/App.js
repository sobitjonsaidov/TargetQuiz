import { useState, useEffect } from "react";
import { QUESTIONS } from "./data/questions";
import { FaSun, FaMoon } from "react-icons/fa";
import logodark from "./assets/itschool.png";
import logolight from "./assets/itschooloq.png";
import Question from "./components/Question";

const TOTAL_TIME = 20 * 60;

function shuffleArray(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

export default function App() {
  const [time, setTime] = useState(TOTAL_TIME);
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [finished, setFinished] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  useEffect(() => setQuestions(shuffleArray(QUESTIONS)), []);

  useEffect(() => {
    if (finished || time <= 0) return setFinished(true);
    const timer = setInterval(() => setTime((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [time, finished]);

  const choose = (i) => setAnswers({ ...answers, [index]: i });

  const score = Object.entries(answers).reduce(
    (s, [i, v]) => s + (questions[i]?.a === v ? 1 : 0),
    0
  );

  const level =
    score <= 25
      ? "Beginner"
      : score <= 35
      ? "Elementary"
      : score <= 45
      ? "Pre-Intermediate"
      : "Intermediate";

     const wrapperClasses = `min-h-screen flex flex-col items-center justify-center transition-colors duration-300 px-2 sm:px-6 md:px-8 ${
    dark ? "bg-slate-900" : "bg-slate-200"
  }`;

   const cardClasses = `text-center w-full sm:max-w-lg md:max-w-2xl mx-auto rounded-xl sm:rounded-2xl shadow p-4 sm:p-6 md:p-8 select-none transition-colors duration-300 ${
    dark ? "bg-slate-800 text-white" : "bg-white text-gray-900"
  }`;

  if (!questions.length) return <div>Loading...</div>;

  if (finished) {
    return (
      <div className={wrapperClasses}>
        <div className="flex w-full max-w-xs sm:max-w-lg md:max-w-2xl justify-end mb-4 sm:mb-6">
          <button
            onClick={() => setDark(!dark)}
            className="relative w-16 h-8 sm:w-20 sm:h-10 rounded-full bg-slate-500 dark:bg-gray-700"
          >
            <div
              className={`absolute top-1 left-1 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white flex items-center justify-center transition-transform ${
                dark ? "translate-x-8 sm:translate-x-10" : "translate-x-0"
              }`}
            >
              {dark ? <FaMoon className="text-slate-400 text-sm sm:text-base" /> : <FaSun className="text-slate-400 text-sm sm:text-base" />}
            </div>
          </button>
        </div>

        <img src={dark ? logolight : logodark} alt="Logo" className="w-40 sm:w-48 md:w-52 lg:w-56 xl:w-64 mb-6 mx-auto" />

        <div className={cardClasses}>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Result</h1>
          <p className="text-lg sm:text-xl md:text-2xl">Score: {score}</p>
          <p className="text-xl sm:text-2xl md:text-3xl font-semibold mt-2">Level: {level}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={wrapperClasses}>
      <div className="flex justify-end w-full max-w-xs sm:max-w-lg md:max-w-2xl mb-4 sm:mb-6">
        <button
          onClick={() => setDark(!dark)}
          className="relative w-16 h-8 sm:w-20 sm:h-10 rounded-full bg-slate-500 dark:bg-gray-700"
        >
          <div
            className={`absolute top-1 left-1 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white flex items-center justify-center transition-transform ${
              dark ? "translate-x-8 sm:translate-x-10" : "translate-x-0"
            }`}
          >
            {dark ? <FaMoon className="text-slate-400 text-sm sm:text-base" /> : <FaSun className="text-slate-400 text-sm sm:text-base" />}
          </div>
        </button>
      </div>

      <img
        src={dark ? logolight : logodark}
        alt="Logo"
        className="w-40 sm:w-48 md:w-52 lg:w-56 xl:w-64 mb-6 mx-auto"
      />

      <div className={cardClasses}>
        <div className="flex justify-between mb-3 sm:mb-4 text-xs sm:text-sm md:text-base">
          <span>
            Question {index + 1}/{questions.length}
          </span>
          <span>
            ⏱️ {Math.floor(time / 60)}:{String(time % 60).padStart(2, "0")}
          </span>
        </div>

        <Question question={questions[index]} selected={answers[index]} choose={choose} />

        <div className="flex justify-end mt-4 sm:mt-6">
          <button
            onClick={() =>
              index + 1 === questions.length ? setFinished(true) : setIndex(index + 1)
            }
            className="px-4 py-2 sm:px-5 sm:py-2 md:px-6 md:py-3 text-base sm:text-xl md:text-2xl lg:text-3xl rounded-lg sm:rounded-xl bg-slate-600 text-white transition-colors hover:bg-slate-700"
          >
            {index + 1 === questions.length ? "Finish" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}
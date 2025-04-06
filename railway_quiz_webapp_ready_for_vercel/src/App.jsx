import { useState } from "react";
import confetti from "canvas-confetti";
import useSound from "use-sound";
import correctSfx from "./assets/correct.mp3";
import wrongSfx from "./assets/wrong.mp3";
import allQuestions from "./data/allQuestions.json";

const questionsPerSet = 50;
const totalSets = Math.ceil(allQuestions.length / questionsPerSet);

const App = () => {
  const [currentSet, setCurrentSet] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [overallScore, setOverallScore] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [playCorrect] = useSound(correctSfx);
  const [playWrong] = useSound(wrongSfx);

  const questions = allQuestions.slice(
    currentSet * questionsPerSet,
    (currentSet + 1) * questionsPerSet
  );
  const currentQuestion = questions[currentQuestionIndex];

  const handleOptionClick = (index) => {
    if (showAnswer) return;
    setSelectedOption(index);
    setShowAnswer(true);
    if (index === currentQuestion.answer) {
      playCorrect();
      setScore(score + 1);
      setOverallScore(overallScore + 1);
      confetti();
    } else {
      playWrong();
    }
  };

  const handleNextQuestion = () => {
    setShowAnswer(false);
    setSelectedOption(null);
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else if (currentSet + 1 < totalSets) {
      setCurrentSet(currentSet + 1);
      setCurrentQuestionIndex(0);
      setScore(0);
    } else {
      alert("🎉 Quiz completed! Total Score: " + overallScore + "/" + allQuestions.length);
    }
  };

  const handleSetChange = (setNumber) => {
    setCurrentSet(setNumber);
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowAnswer(false);
    setSelectedOption(null);
  };

  return (
    <div className="p-4 max-w-2xl mx-auto font-sans">
      <div className="flex flex-wrap gap-2 mb-4">
        {Array.from({ length: totalSets }).map((_, i) => (
          <button
            key={i}
            onClick={() => handleSetChange(i)}
            className={\`px-3 py-1 rounded \${i === currentSet ? "bg-blue-500 text-white" : "bg-gray-200"}\`}
          >
            Set {i + 1}
          </button>
        ))}
      </div>
      <div className="mb-2 text-xl font-bold">
        Set {currentSet + 1} / {totalSets} | Question {currentQuestionIndex + 1} / {questions.length}
      </div>
      <div className="mb-2">Set Score: {score} | Total Score: {overallScore}</div>
      <div className="border rounded p-4 mb-4 bg-white shadow">
        <div className="font-semibold mb-2">{currentQuestion.question}</div>
        {currentQuestion.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionClick(index)}
            className={\`block w-full my-1 text-left p-2 rounded \${showAnswer
              ? index === currentQuestion.answer
                ? "bg-green-300"
                : index === selectedOption
                ? "bg-red-300"
                : "bg-gray-100"
              : "bg-gray-100"}\`}
          >
            {option}
          </button>
        ))}
      </div>
      {showAnswer && (
        <button onClick={handleNextQuestion} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
          Next
        </button>
      )}
    </div>
  );
};

export default App;
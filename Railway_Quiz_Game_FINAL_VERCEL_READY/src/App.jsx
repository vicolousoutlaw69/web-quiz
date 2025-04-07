import React, { useState, useEffect } from "react";
import questions from "./data/railway_quiz_all_1000_questions.json";
import "./App.css";

function App() {
  const [currentSet, setCurrentSet] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answered, setAnswered] = useState(false);

  const questionsPerSet = 50;
  const totalSets = Math.ceil(questions.length / questionsPerSet);
  const currentSetQuestions = questions.slice(
    currentSet * questionsPerSet,
    (currentSet + 1) * questionsPerSet
  );

  const currentQuestion = currentSetQuestions[currentQuestionIndex];

  const handleOptionClick = (option) => {
    if (answered) return;

    setSelectedOption(option);
    setAnswered(true);

    if (option === currentQuestion.answer) {
      setScore(score + 1);
    }

    setTimeout(() => {
      setSelectedOption(null);
      setAnswered(false);
      if (currentQuestionIndex + 1 < currentSetQuestions.length) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setShowResult(true);
      }
    }, 1000);
  };

  const handleNextSet = () => {
    setCurrentSet((prev) => Math.min(prev + 1, totalSets - 1));
    resetQuiz();
  };

  const handlePrevSet = () => {
    setCurrentSet((prev) => Math.max(prev - 1, 0));
    resetQuiz();
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setScore(0);
    setShowResult(false);
    setAnswered(false);
  };

  return (
    <div className="app">
      <h1>Indian Railway Quiz Game</h1>
      <h2>Set {currentSet + 1} of {totalSets}</h2>

      {showResult ? (
        <div className="result">
          <h2>Your Score: {score} / {currentSetQuestions.length}</h2>
          <div className="set-controls">
            <button onClick={handlePrevSet} disabled={currentSet === 0}>
              Previous Set
            </button>
            <button onClick={handleNextSet} disabled={currentSet === totalSets - 1}>
              Next Set
            </button>
          </div>
        </div>
      ) : (
        <div className="quiz">
          <h3>Q{currentQuestionIndex + 1}: {currentQuestion.question}</h3>
          <div className="options">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                className={`option ${selectedOption === option
                  ? option === currentQuestion.answer
                    ? "correct"
                    : "incorrect"
                  : ""
                  }`}
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </button>
            ))}
          </div>
          <p>Score: {score}</p>
        </div>
      )}
    </div>
  );
}

export default Quiz;
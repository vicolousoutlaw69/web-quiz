
import { useState } from "react";

const Quiz = () => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);

  const questions = [
    {
      question: "What is the capital of India?",
      options: ["Mumbai", "Delhi", "Chennai", "Kolkata"],
      answer: 1,
    },
    {
      question: "Which train is the fastest in India?",
      options: ["Shatabdi", "Duronto", "Rajdhani", "Vande Bharat"],
      answer: 3,
    },
  ];

  const handleAnswer = (index) => {
    if (index === questions[questionIndex].answer) {
      setScore(score + 1);
      alert("Correct!");
    } else {
      alert("Wrong!");
    }

    if (questionIndex + 1 < questions.length) {
      setQuestionIndex(questionIndex + 1);
    } else {
      alert("Quiz Over! Your score: " + score);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Railway Quiz</h1>
      <div className="mb-2">{questions[questionIndex].question}</div>
      {questions[questionIndex].options.map((option, idx) => (
        <button
          key={idx}
          onClick={() => handleAnswer(idx)}
          className="block w-full my-1 p-2 bg-blue-100 hover:bg-blue-200"
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default Quiz;

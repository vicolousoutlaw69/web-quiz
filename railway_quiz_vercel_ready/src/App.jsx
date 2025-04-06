
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
    <div className="p-4 max-w-2xl mx-auto">
      <div className="flex flex-wrap gap-2 mb-4">
        {Array.from({ length: totalSets }).map((_, i) => (
          <Button
            key={i}
            onClick={() => handleSetChange(i)}
            className={`px-3 ${i === currentSet ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          >
            Set {i + 1}
          </Button>
        ))}
      </div>
      <div className="mb-2 text-xl font-bold">
        Set {currentSet + 1} / {totalSets} | Question {currentQuestionIndex + 1} / {questions.length}
      </div>
      <div className="mb-2">Set Score: {score} | Total Score: {overallScore}</div>
      <Card className="mb-4">
        <CardContent className="p-4">
          <div className="font-semibold mb-2">{currentQuestion.question}</div>
          {currentQuestion.options.map((option, index) => (
            <Button
              key={index}
              onClick={() => handleOptionClick(index)}
              className={`block w-full my-1 text-left ${
                showAnswer
                  ? index === currentQuestion.answer
                    ? "bg-green-300"
                    : index === selectedOption
                    ? "bg-red-300"
                    : ""
                  : ""
              }`}
            >
              {option}
            </Button>
          ))}
        </CardContent>
      </Card>
      {showAnswer && (
        <Button onClick={handleNextQuestion} className="mt-2">
          Next
        </Button>
      )}
    </div>
  );
};

export default App;

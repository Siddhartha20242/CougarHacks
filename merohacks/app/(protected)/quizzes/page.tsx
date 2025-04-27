'use client'; // This directive tells Next.js that this code is meant to run in the user's browser.

import { useState, useEffect } from 'react'; // Importing React hooks: useState for managing component-specific data, useEffect for handling side effects.
import allQuizData from './quiz-data'; // Importing quiz questions and answers from a local file.
import { QuizQuestion } from './quiz-data'; // Importing the type definition for a quiz question.

const QUIZ_COUNT = 10; // Defining a constant for the number of questions to display in each quiz session.

export default function QuizPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // State to track the index of the current question being displayed, starts at 0.
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null); // State to store the user's selected answer for the current question, initially null.
  const [score, setScore] = useState(0); // State to keep track of the user's score, initialized to 0.
  const [showFeedback, setShowFeedback] = useState(false); // State to control whether to display feedback (correct/incorrect) for the user's answer, initially false.
  const [isFinished, setIsFinished] = useState(false); // State to indicate if the quiz has been completed, initially false.
  const [currentQuizQuestions, setCurrentQuizQuestions] = useState<QuizQuestion[]>([]); // State to store the array of questions for the current quiz session.

  useEffect(() => {
    // This effect runs once when the component mounts (is initially rendered).
    const shuffledData = [...allQuizData].sort(() => Math.random() - 0.5); // Creates a shuffled copy of all quiz questions.
    setCurrentQuizQuestions(shuffledData.slice(0, QUIZ_COUNT)); // Selects the first QUIZ_COUNT questions from the shuffled array.
    setCurrentQuestionIndex(0); // Resets the question index to start from the first question.
    setScore(0);             // Resets the score to 0.
    setIsFinished(false);     // Resets the quiz completion status.
    setSelectedAnswer(null);  // Resets the selected answer.
    setShowFeedback(false);  // Hides feedback.
  }, []); // The empty dependency array [] ensures this effect runs only once on mount.

  const currentQuestion: QuizQuestion | undefined = currentQuizQuestions[currentQuestionIndex]; // Gets the current question object based on the currentQuestionIndex.

  const handleAnswerClick = (selectedOption: string) => {
    // This function is called when the user clicks on an answer option.
    setSelectedAnswer(selectedOption); // Updates the selectedAnswer state with the user's choice.
    setShowFeedback(true);          // Shows the feedback (correct/incorrect message).
  };

  const handleNextQuestion = () => {
    // This function is called when the user clicks the "Next" or "Finish Quiz" button.
    if (selectedAnswer === currentQuestion?.correctAnswer) {
      // Checks if the selected answer is correct.
      setScore((prevScore) => prevScore + (currentQuestion?.money || 0)); // Increments the score by the question's money value (or 0 if money is undefined).
    }
    setSelectedAnswer(null); // Resets the selected answer.
    setShowFeedback(false); // Hides feedback.

    if (currentQuestionIndex + 1 < QUIZ_COUNT) {
      // If there are more questions remaining.
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1); // Move to the next question.
    } else {
      setIsFinished(true); // If it was the last question, mark the quiz as finished.
    }
  };

  const handleStartNewQuiz = () => {
    // This function is called when the user clicks the "Play Again" button.
    const shuffledData = [...allQuizData].sort(() => Math.random() - 0.5); // Shuffles all quiz questions again.
    setCurrentQuizQuestions(shuffledData.slice(0, QUIZ_COUNT)); // Selects a new set of questions.
    setCurrentQuestionIndex(0); // Resets to the first question.
    setScore(0);             // Resets the score.
    setIsFinished(false);     // Resets quiz status.
    setSelectedAnswer(null);  // Resets selected answer.
    setShowFeedback(false);  // Hides feedback.
  };

  if (isFinished) {
    // Render this UI when the quiz is finished.
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-100 to-purple-100">
        <div className="bg-white p-10 rounded-xl shadow-xl text-center">
          <h1 className="text-4xl font-extrabold text-green-500 mb-6 animate-pulse">Quiz Completed! 🎉</h1>
          <p className="text-lg text-gray-700 mb-4">Your final score is:</p>
          <p className="text-5xl font-bold text-blue-600 mb-8">${score} / ${currentQuizQuestions.reduce((sum, q) => sum + q.money, 0)}</p>
          <button
            className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-md transition duration-300 ease-in-out"
            onClick={handleStartNewQuiz}
          >
            Play Again <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    );
  }

  if (!currentQuestion) {
    // Render this UI while the quiz questions are being loaded.
    return <div className="flex justify-center items-center h-screen">Loading Quiz...</div>;
  }

  // Render the main quiz UI.
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 py-12 px-4 sm:px-6 lg:px-8 flex justify-center items-center">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl w-full">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-blue-700 mb-4">🧠 Quiz Time!</h1>
          <p className="text-sm text-gray-500">Question worth: <span className="font-semibold text-green-600">${currentQuestion.money}</span></p>
        </div>
        <div className="mb-8">
          <h2 className="text-xl text-gray-800 font-semibold mb-3">{currentQuestion.question}</h2>
          <ul className="space-y-3">
            {currentQuestion.options.map((option) => (
              <li key={option}>
                <button
                  className={`w-full text-left bg-blue-200 hover:bg-blue-300 text-blue-800 font-semibold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm transition duration-200 ease-in-out ${showFeedback ? 'cursor-not-allowed opacity-50' : ''} ${selectedAnswer === option ? 'ring-2 ring-indigo-500' : ''}`}
                  onClick={() => handleAnswerClick(option)}
                  disabled={showFeedback}
                >
                  {option}
                </button>
              </li>
            ))}
          </ul>
          <p className="text-xs text-gray-400 mt-4">Question {currentQuestionIndex + 1} of {QUIZ_COUNT}</p>
        </div>

        {showFeedback && (
          <div className="mt-8 p-6 rounded-md shadow-inner">
            {selectedAnswer === currentQuestion.correctAnswer ? (
              <p className="text-green-600 font-semibold mb-2">✅ Correct!</p>
            ) : (
              <p className="text-red-600 font-semibold mb-2">❌ Incorrect. The correct answer was: <span className="text-gray-800 font-medium">{currentQuestion.correctAnswer}</span></p>
            )}
            {currentQuestionIndex < QUIZ_COUNT - 1 ? (
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full focus:outline-none focus:ring-2 focus:ring-green-400 shadow-md transition duration-300 ease-in-out"
                onClick={handleNextQuestion}
              >
                Next <span aria-hidden="true">→</span>
              </button>
            ) : (
              <button
                className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-md transition duration-300 ease-in-out"
                onClick={handleNextQuestion}
              >
                Finish Quiz <span aria-hidden="true">→</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

import { useState } from 'react';

const quizData = [
  { question: "Which team has won the most NBA championships?", options: ["Boston Celtics", "Lakers", "Miami Heat", "Oklahoma"], answer: 0 },
  { question: "Who is the NBA’s all-time leading scorer (regular season)?", options: ["Yaoming", "Lebron James", "Jordan Clarkson", "James Harden"], answer: 1 },
  { question: "How many players are on the court during a basketball game?", options: ["11", "7", "10", "13"], answer: 2 },
  { question: "What city do the Miami Heat represent?", options: ["Jacksonville", "Miami", "Orlando", "Tampa"], answer: 1 }
];

export default function Quiz() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [isFinished, setIsFinished] = useState(false);

  const handleSubmit = () => {
    if (selectedOpt === null) return;
    
    const isCorrect = selectedOpt === quizData[currentIdx].answer;
    if (isCorrect) setScore(s => s + 1);
    
    setFeedback({
        text: isCorrect ? 'Correct!' : `Wrong! Correct answer: ${quizData[currentIdx].options[quizData[currentIdx].answer]}`,
        color: isCorrect ? 'green' : 'red'
    });

    setTimeout(() => {
      setFeedback(null);
      setSelectedOpt(null);
      if (currentIdx + 1 < quizData.length) {
        setCurrentIdx(c => c + 1);
      } else {
        setIsFinished(true);
      }
    }, 1500);
  };

  if (isFinished) {
    return (
      <div id="quiz-container">
        <h2>Quiz Complete!</h2>
        <p style={{ color: 'var(--text-color)' }}>Your final score is {score} out of {quizData.length}.</p>
      </div>
    );
  }

  return (
    <div id="quiz-container">
      <div id="question">{quizData[currentIdx].question}</div>
      <div id="options">
        {quizData[currentIdx].options.map((opt, idx) => (
          <div 
            key={idx} 
            className={`option ${selectedOpt === idx ? 'selected' : ''}`}
            onClick={() => !feedback && setSelectedOpt(idx)}
          >
            {opt}
          </div>
        ))}
      </div>
      <button id="submitBtn" disabled={selectedOpt === null || feedback} onClick={handleSubmit}>
        Submit Answer
      </button>
      {feedback && <div id="result" style={{ color: feedback.color }}>{feedback.text}</div>}
    </div>
  );
}
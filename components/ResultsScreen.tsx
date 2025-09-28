import React from 'react';
import { Question } from '../types';
import Card from './Card';
import Button from './Button';
import Icon from './Icon';

interface ResultsScreenProps {
  score: number;
  totalQuestions: number;
  questions: Question[];
  userAnswers: string[];
  onPlayAgain: () => void;
}

const ResultsScreen: React.FC<ResultsScreenProps> = ({ score, totalQuestions, questions, userAnswers, onPlayAgain }) => {
  const percentage = Math.round((score / totalQuestions) * 100);
  const getPerformanceMessage = () => {
    if (percentage === 100) return "Perfect Score! Amazing!";
    if (percentage >= 80) return "Great Job! You're a pro!";
    if (percentage >= 50) return "Good effort! Keep practicing!";
    return "Keep trying! Practice makes perfect!";
  };

  return (
    <Card>
      <div className="text-center">
        <h1 className="text-3xl font-bold text-cyan-400 mb-2 font-display">Results</h1>
        <p className="text-slate-400 mb-6">{getPerformanceMessage()}</p>
        <div className="mb-8">
          <p className="text-5xl font-bold text-white">{score} <span className="text-3xl text-slate-400">/ {totalQuestions}</span></p>
          <p className="text-cyan-400 text-xl font-semibold mt-1">({percentage}%)</p>
        </div>

        <div className="text-left max-h-60 overflow-y-auto bg-slate-900/50 p-4 rounded-lg border border-slate-700">
            <h3 className="text-lg font-semibold mb-3 text-white font-display">Your Answers:</h3>
            <ul>
                {questions.map((q, index) => {
                    const userAnswer = userAnswers[index];
                    const userAnswerNum = parseInt(userAnswer);
                    const isCorrect = userAnswerNum === q.answer;
                    const timedOut = userAnswer === '';

                    return (
                        <li key={index} className="flex items-center justify-between p-2 border-b border-slate-700 last:border-b-0">
                           <div className="flex items-center gap-3">
                                {isCorrect ? <Icon type="check" className="text-green-400"/> : <Icon type="x" className="text-red-400"/>}
                                <span className="text-slate-300 text-sm sm:text-base">{q.text}</span>
                           </div>
                           <div className="flex items-center gap-2 text-sm sm:text-base">
                            {timedOut ? (
                                <span className="text-yellow-400">Timed Out</span>
                            ) : (
                                <span className={`${isCorrect ? 'text-green-400' : 'text-red-400 line-through'}`}>{userAnswer}</span>
                            )}
                            {!isCorrect && <span className="text-slate-400 text-sm">(ans: {q.answer})</span>}
                           </div>
                        </li>
                    )
                })}
            </ul>
        </div>

        <Button onClick={onPlayAgain} className="mt-8 w-full">
          Play Again
        </Button>
      </div>
    </Card>
  );
};

export default ResultsScreen;
import React, { useState, useEffect } from 'react';
import { Question } from '../types';
import { QUESTION_TIMER_SECONDS } from '../constants';
import Card from './Card';
import Button from './Button';

interface PracticeScreenProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  score: number;
  onSubmit: (answer: string) => void;
}

const PracticeScreen: React.FC<PracticeScreenProps> = ({ question, questionNumber, totalQuestions, score, onSubmit }) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIMER_SECONDS);
  const hasAnswered = selectedOption !== null;

  useEffect(() => {
    if (hasAnswered) return;

    if (timeLeft === 0) {
      setSelectedOption(-1); // Use a special value for timeout
      onSubmit(''); // Submit empty string for timeout
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft, hasAnswered, onSubmit]);

  const handleOptionClick = (option: number) => {
    if (hasAnswered) return;
    setSelectedOption(option);
    onSubmit(String(option));
  };
  
  const getButtonState = (option: number) => {
    if (!hasAnswered) return 'default';
    if (option === question.answer) return 'correct';
    if (option === selectedOption) return 'incorrect';
    return 'disabled';
  };

  const getTimeColor = () => {
    if (timeLeft <= 2) return 'text-red-500';
    if (timeLeft <= 4) return 'text-yellow-400';
    return 'text-cyan-400';
  }

  return (
    <Card className="animate-fade-in">
       <div className="w-full h-2 bg-slate-700 rounded-full mb-4">
        <div 
          className="h-2 bg-cyan-400 rounded-full transition-all duration-300" 
          style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
        ></div>
      </div>
      <div className="flex justify-between items-center mb-4">
        <div className={`text-xl font-bold font-mono ${getTimeColor()}`}>
          00:0{timeLeft}
        </div>
        <div className="text-xl font-bold text-cyan-400 font-mono">
          Score: {score}
        </div>
        <p className="text-right text-slate-400 text-sm font-mono">
          {questionNumber} / {totalQuestions}
        </p>
      </div>
      
      <div className="flex flex-col items-center justify-center min-h-[350px]">
        <div className="relative mb-8 text-center">
             <h2 className="text-4xl font-bold text-white tracking-wider font-display">{question.text}</h2>
        </div>

        <div className="w-full grid grid-cols-2 gap-4">
            {question.options.map(option => (
                <Button
                    key={option}
                    variant="option"
                    onClick={() => handleOptionClick(option)}
                    disabled={hasAnswered}
                    state={getButtonState(option)}
                >
                    {option}
                </Button>
            ))}
        </div>
      </div>
    </Card>
  );
};

export default PracticeScreen;
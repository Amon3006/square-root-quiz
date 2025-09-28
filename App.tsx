import React, { useState, useCallback } from 'react';
import { GameMode, GameState, Question } from './types';
import { TOTAL_QUESTIONS } from './constants';
import StartScreen from './components/StartScreen';
import PracticeScreen from './components/PracticeScreen';
import ResultsScreen from './components/ResultsScreen';

const shuffleArray = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('start');
  const [gameMode, setGameMode] = useState<GameMode | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);

  const generateQuestions = useCallback((mode: GameMode) => {
    const newQuestions: Question[] = [];
    const usedNumbers = new Set<number>();

    while (newQuestions.length < TOTAL_QUESTIONS) {
      const question: Partial<Question> = {};
      let number: number;

      if (mode === 'squares') {
        number = Math.floor(Math.random() * 90) + 10; // 10 to 99
        if (usedNumbers.has(number)) continue;
        
        const answer = number * number;
        question.text = `What is ${number}²?`;
        question.answer = answer;

        const distractors = new Set<number>();
        distractors.add((number + 1) * (number - 1)); // n^2 - 1
        distractors.add((number + 1) * (number + 1));
        distractors.add((number - 1) * (number - 1));
        distractors.delete(answer); // ensure no duplicates with answer
        
        while (distractors.size < 3) {
            distractors.add(answer + (Math.floor(Math.random() * 20) - 10) * (number/10));
            distractors.delete(answer);
        }

        question.options = shuffleArray([answer, ...Array.from(distractors).slice(0,3)]);
        usedNumbers.add(number);

      } else { // squareRoots
        number = Math.floor(Math.random() * 68) + 32; // 32 to 99
        if (usedNumbers.has(number)) continue;

        const square = number * number;
        question.text = `What is √${square}?`;
        question.answer = number;
        
        const distractors = new Set<number>();
        distractors.add(number + 1);
        distractors.add(number - 1);
        distractors.add(number + 2);
        distractors.delete(number);

        while (distractors.size < 3) {
            distractors.add(number + Math.floor(Math.random() * 5) - 2);
            distractors.delete(number);
        }

        question.options = shuffleArray([number, ...Array.from(distractors).slice(0,3)]);
        usedNumbers.add(number);
      }
      newQuestions.push(question as Question);
    }
    return newQuestions;
  }, []);

  const handleStartGame = useCallback((mode: GameMode) => {
    setGameMode(mode);
    setQuestions(generateQuestions(mode));
    setCurrentQuestionIndex(0);
    setScore(0);
    setUserAnswers([]);
    setGameState('playing');
  }, [generateQuestions]);

  const handleAnswerSubmit = (answer: string) => {
    const isCorrect = parseInt(answer) === questions[currentQuestionIndex].answer;
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
    setUserAnswers(prev => [...prev, answer]);

    const isLastQuestion = currentQuestionIndex === TOTAL_QUESTIONS - 1;
    setTimeout(() => {
        if (isLastQuestion) {
            setGameState('results');
        } else {
            setCurrentQuestionIndex(prev => prev + 1);
        }
    }, 2000); // Wait 2s before next question or results
  };

  const handlePlayAgain = () => {
    setGameState('start');
    setGameMode(null);
  };

  const renderContent = () => {
    switch (gameState) {
      case 'start':
        return <StartScreen onStartGame={handleStartGame} />;
      case 'playing':
        return (
          <PracticeScreen
            key={currentQuestionIndex}
            question={questions[currentQuestionIndex]}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={TOTAL_QUESTIONS}
            score={score}
            onSubmit={handleAnswerSubmit}
          />
        );
      case 'results':
        return (
          <ResultsScreen
            score={score}
            totalQuestions={TOTAL_QUESTIONS}
            questions={questions}
            userAnswers={userAnswers}
            onPlayAgain={handlePlayAgain}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md mx-auto">
            {renderContent()}
        </div>
    </div>
  );
};

export default App;
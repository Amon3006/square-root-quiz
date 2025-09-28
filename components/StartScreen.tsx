import React from 'react';
import { GameMode } from '../types';
import Card from './Card';
import Button from './Button';

interface StartScreenProps {
  onStartGame: (mode: GameMode) => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStartGame }) => {
  return (
    <Card>
      <div className="text-center">
        <h1 className="text-3xl font-bold text-cyan-400 mb-2 font-display">Math Squarer</h1>
        <p className="text-slate-400 mb-8">Choose a mode to test your skills.</p>
        <div className="flex flex-col space-y-4">
          <Button onClick={() => onStartGame('squares')}>
            Practice Squares (e.g. 42²)
          </Button>
          <Button onClick={() => onStartGame('squareRoots')}>
            Practice Square Roots (e.g. √1764)
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default StartScreen;
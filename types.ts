export type GameMode = 'squares' | 'squareRoots';
export type GameState = 'start' | 'playing' | 'results';

export interface Question {
  text: string;
  answer: number;
  options: number[];
}
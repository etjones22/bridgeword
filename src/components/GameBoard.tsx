"use client";

import { useState } from 'react';
import type { PuzzleData } from '../lib/puzzles';
import { buildShareGrid } from '../lib/puzzles';
import AdUnit from './AdUnit';

interface GameBoardProps {
  puzzle: PuzzleData;
}

interface GuessResult {
  guess: string;
  count: number;
  correct: boolean;
}

/**
 * Main gameplay component. Displays the clue words, accepts guesses and
 * renders feedback for each guess. Once the puzzle is solved or the
 * maximum number of attempts is reached, the correct answer and an
 * explanation are shown along with a shareable emoji grid.
 */
export default function GameBoard({ puzzle }: GameBoardProps) {
  const [guessInput, setGuessInput] = useState('');
  const [results, setResults] = useState<GuessResult[]>([]);
  const [complete, setComplete] = useState(false);

  const remaining = 10 - results.length;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const guess = guessInput.trim();
    if (!guess) return;
    // Avoid duplicate guesses
    if (results.some((r) => r.guess.toLowerCase() === guess.toLowerCase())) {
      window.alert('You already guessed that!');
      return;
    }
    try {
      const res = await fetch('/api/guess', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date: puzzle.date, guess })
      });
      if (!res.ok) throw new Error('Request failed');
      const data = await res.json();
      const result: GuessResult = {
        guess,
        count: data.count,
        correct: data.correct,
      };
      setResults((prev) => {
        const next = [...prev, result];
        if (data.correct || next.length >= 10) {
          setComplete(true);
        }
        return next;
      });
      setGuessInput('');
    } catch (err) {
      console.error(err);
      window.alert('Something went wrong. Please try again.');
    }
  }

  function handleCopy() {
    const grid = buildShareGrid(results.map((r) => ({ guess: r.guess, count: r.count })));
    const shareText = `BridgeWord ${puzzle.date} ${results.findIndex((r) => r.correct) + 1}/10\n${grid}\nhttps://YOURDOMAIN.com/?date=${puzzle.date}`;
    navigator.clipboard.writeText(shareText);
    window.alert('Copied results to clipboard!');
  }

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {puzzle.clueWords.map((clue) => (
          <span key={clue} className="inline-flex items-center px-3 py-1 bg-indigo-100 text-indigo-800 rounded-md">
            {clue}
          </span>
        ))}
      </div>
      {!complete && (
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <input
            type="text"
            value={guessInput}
            onChange={(e) => setGuessInput(e.target.value)}
            placeholder="Enter your guess"
            className="flex-1 border border-gray-300 rounded-md p-2"
            aria-label="Guess the bridge word"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            disabled={!guessInput.trim()}
          >
            Guess
          </button>
        </form>
      )}
      <div className="space-y-2">
        {results.map((r, idx) => (
          <div key={idx} className="flex justify-between items-center border border-gray-200 rounded-md p-2">
            <span className="font-medium">{r.guess}</span>
            <span>{'🟩'.repeat(r.count) + '⬜'.repeat(4 - r.count)}</span>
          </div>
        ))}
      </div>
      {complete && (
        <div className="space-y-3">
          {results.some((r) => r.correct) ? (
            <p className="font-semibold">Congratulations! You found the bridge word: {puzzle.secretWord}</p>
          ) : (
            <p className="font-semibold">The correct bridge word was: {puzzle.secretWord}</p>
          )}
          {puzzle.explanation && <p className="text-sm text-gray-600">{puzzle.explanation}</p>}
          <button
            onClick={handleCopy}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Share your results
          </button>
        </div>
      )}
      {!complete && (
        <p className="text-sm text-gray-500">{remaining} guess{remaining === 1 ? '' : 'es'} remaining</p>
      )}
      {/**
       * Insert a responsive ad unit beneath the game on mobile and at the bottom of
       * the page on desktop. Replace the slot value with your actual AdSense
       * slot ID.
       */}
      <AdUnit slot="1234567890" className="mt-4" />
    </section>
  );
}
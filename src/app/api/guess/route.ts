import { NextResponse } from 'next/server';
import { getPuzzleByDate, scoreGuess } from '../../../lib/puzzles';

export async function POST(req: Request) {
  try {
    const { date, guess } = await req.json();
    if (!date || !guess) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }
    const puzzle = await getPuzzleByDate(date);
    if (!puzzle) {
      return NextResponse.json({ error: 'Puzzle not found' }, { status: 404 });
    }
    const count = scoreGuess(guess, puzzle.combos);
    const correct = guess.trim().toLowerCase() === puzzle.secretWord.toLowerCase();
    return NextResponse.json({ count, correct });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
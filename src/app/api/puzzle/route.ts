import { NextResponse } from 'next/server';
import { getPuzzleByDate, getLatestPuzzle } from '../../../lib/puzzles';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get('date') ?? undefined;
  const puzzle = date ? await getPuzzleByDate(date) : await getLatestPuzzle();
  if (!puzzle) {
    return NextResponse.json({ error: 'Puzzle not found' }, { status: 404 });
  }
  // Hide secretWord from clients until the puzzle is solved. We'll include
  // clueWords and the date, but omit combos and secretWord. Combos are only
  // used server-side when scoring guesses.
  const { id, date: d, clueWords } = puzzle;
  return NextResponse.json({ id, date: d, clueWords });
}
import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';
import { generateRandomPuzzle } from '../../../../lib/puzzles';

export async function POST(req: Request) {
  const apiKey = req.headers.get('x-api-key');
  if (apiKey !== process.env.ADMIN_KEY) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  // Generate the puzzle for tomorrow at 00:00 UTC.
  const now = new Date();
  const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
  const date = tomorrow.toISOString().substring(0, 10);
  const puzzle = generateRandomPuzzle();
  try {
    await prisma.puzzle.upsert({
      where: { date },
      update: {},
      create: {
        date,
        clueWords: JSON.stringify(puzzle.clueWords),
        secretWord: puzzle.secretWord,
        combos: JSON.stringify(puzzle.combos),
        explanation: puzzle.explanation ?? undefined,
      }
    });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
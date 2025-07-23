import prisma from './prisma';

export interface PuzzleData {
  id: number;
  date: string;
  clueWords: string[];
  secretWord: string;
  combos: string[];
  explanation?: string | null;
}

/**
 * Parse a puzzle record from the database into a typed PuzzleData object.
 */
export function parsePuzzle(record: any): PuzzleData {
  return {
    id: record.id,
    date: record.date,
    clueWords: JSON.parse(record.clueWords),
    secretWord: record.secretWord,
    combos: JSON.parse(record.combos),
    explanation: record.explanation ?? null,
  };
}

/**
 * Score a guess by counting how many of the puzzle's phrase combinations
 * include the guess as one of the words. For example, if a puzzle has
 * combos ["fire ant", "firewall"] and the guess is "fire", this
 * function returns 2. Matching is case-insensitive and ignores leading
 * and trailing whitespace.
 */
export function scoreGuess(guess: string, combos: string[]): number {
  const normalized = guess.trim().toLowerCase();
  let hits = 0;
  for (const combo of combos) {
    const parts = combo.toLowerCase().split(/\s+/);
    if (parts.includes(normalized)) {
      hits++;
    }
  }
  return hits;
}

/**
 * Create an emoji grid summary similar to Wordle. Each row contains four
 * squares representing the number of matches for that guess. A filled
 * square (🟩) indicates a match, and an empty square (⬜) indicates no
 * match. For example, a row with 2 matches yields "🟩🟩⬜⬜".
 */
export function buildShareGrid(results: { guess: string; count: number }[]): string {
  return results
    .map(({ count }) => {
      const filled = '🟩'.repeat(count);
      const empty = '⬜'.repeat(4 - count);
      return filled + empty;
    })
    .join('\n');
}

/**
 * Fetch the puzzle for a given date. Dates are stored as ISO strings
 * (YYYY-MM-DD). If no puzzle exists for the date the promise resolves
 * with null.
 */
export async function getPuzzleByDate(date: string): Promise<PuzzleData | null> {
  const puzzle = await prisma.puzzle.findUnique({ where: { date } });
  return puzzle ? parsePuzzle(puzzle) : null;
}

/**
 * Fetch the most recent puzzle. Useful for the marketing page when no
 * date parameter is provided.
 */
export async function getLatestPuzzle(): Promise<PuzzleData | null> {
  const puzzle = await prisma.puzzle.findFirst({ orderBy: { date: 'desc' } });
  return puzzle ? parsePuzzle(puzzle) : null;
}

/**
 * Generate a new puzzle. In a real application this would likely pull
 * from a curated list of bridge words. For the purposes of this demo it
 * picks a random entry from a hardcoded list. This function is called
 * from the admin API route and should be protected appropriately.
 */
export function generateRandomPuzzle(): PuzzleData {
  // A few example puzzles for demonstration. Each entry includes four
  // clue words, the bridge word, and the full phrases resulting from
  // combining the bridge word with each clue.
  const examples: Omit<PuzzleData, 'id' | 'date'>[] = [
    {
      clueWords: ['ant', 'fighter', 'cracker', 'wall'],
      secretWord: 'fire',
      combos: ['fire ant', 'firefighter', 'firecracker', 'firewall'],
      explanation: 'Fire bridges to ant, fighter, cracker and wall to form fire ant, firefighter, firecracker and firewall.'
    },
    {
      clueWords: ['green', 'black', 'tea', 'house'],
      secretWord: 'tea',
      combos: ['green tea', 'black tea', 'tea house', 'tea tree'],
      explanation: 'Tea bridges to green, black, house and tree.'
    },
    {
      clueWords: ['rain', 'snow', 'ice', 'thunder'],
      secretWord: 'storm',
      combos: ['rain storm', 'snow storm', 'ice storm', 'thunderstorm'],
      explanation: 'Storm is the bridge between rain, snow, ice and thunder.'
    }
  ];
  const selection = examples[Math.floor(Math.random() * examples.length)];
  return {
    id: -1,
    date: new Date().toISOString().substring(0, 10),
    ...selection
  };
}
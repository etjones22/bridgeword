import prisma from '../src/lib/prisma';
import { generateRandomPuzzle } from '../src/lib/puzzles';

async function main() {
  // Create three sample puzzles for the past three days if they don't already exist.
  const now = new Date();
  for (let i = 0; i < 3; i++) {
    const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    const isoDate = date.toISOString().substring(0, 10);
    const existing = await prisma.puzzle.findUnique({ where: { date: isoDate } });
    if (!existing) {
      const puzzle = generateRandomPuzzle();
      await prisma.puzzle.create({
        data: {
          date: isoDate,
          clueWords: JSON.stringify(puzzle.clueWords),
          secretWord: puzzle.secretWord,
          combos: JSON.stringify(puzzle.combos),
          explanation: puzzle.explanation ?? undefined,
        }
      });
      console.log(`Inserted puzzle for ${isoDate}`);
    }
  }
  await prisma.$disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
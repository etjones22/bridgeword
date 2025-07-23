import prisma from '../../lib/prisma';
import Link from 'next/link';

export const metadata = {
  title: 'Puzzle Archive',
  description: 'Browse past BridgeWord puzzles by date.',
};

async function fetchDates() {
  const puzzles = await prisma.puzzle.findMany({ orderBy: { date: 'desc' } });
  return puzzles.map((p) => p.date);
}

export default async function ArchivePage() {
  const dates = await fetchDates();
  return (
    <main className="max-w-2xl mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold">Archive</h1>
      <p>Missed a day? Replay any previous BridgeWord puzzle from the list below.</p>
      <ul className="space-y-2">
        {dates.map((date) => (
          <li key={date}>
            <Link href={{ pathname: '/', query: { date } }} className="text-indigo-600 hover:underline">
              {date}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
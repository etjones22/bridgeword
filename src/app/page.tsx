import { getLatestPuzzle, getPuzzleByDate } from '../lib/puzzles';
import GameBoard from '../components/GameBoard';
import { notFound } from 'next/navigation';

interface Props {
  searchParams?: { [key: string]: string | string[] | undefined };
}

// The landing page displays the current daily puzzle. An optional `date`
// query parameter allows users to view a past puzzle from the archive.
export default async function Page({ searchParams }: Props) {
  const dateParam = typeof searchParams?.date === 'string' ? searchParams?.date : undefined;
  const puzzle = dateParam
    ? await getPuzzleByDate(dateParam)
    : await getLatestPuzzle();
  if (!puzzle) {
    return notFound();
  }
  return (
    <main className="max-w-2xl mx-auto p-4 space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">BridgeWord</h1>
        <p>One secret word bridges four clues. Can you find today’s bridge?</p>
      </header>
      <GameBoard puzzle={puzzle} />
    </main>
  );
}
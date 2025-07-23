import Link from 'next/link';

export default function NavBar() {
  return (
    <nav className="w-full border-b border-gray-200 bg-white mb-4">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-xl font-semibold">
          BridgeWord
        </Link>
        <div className="space-x-4 text-sm">
          <Link href="/archive" className="hover:underline">Archive</Link>
          <Link href="/about" className="hover:underline">About</Link>
          <Link href="/privacy-policy" className="hover:underline">Privacy</Link>
          <Link href="/terms" className="hover:underline">Terms</Link>
          <Link href="/contact" className="hover:underline">Contact</Link>
        </div>
      </div>
    </nav>
  );
}
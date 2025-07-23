export const metadata = {
  title: 'About BridgeWord',
  description: 'Learn about the origins of BridgeWord and the team behind the daily puzzle game.',
};

export default function AboutPage() {
  return (
    <main className="max-w-2xl mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold">About BridgeWord</h1>
      <p>
        BridgeWord was born from our love of word games and brain teasers. Each day we craft a new
        puzzle that challenges you to find the one word that bridges four seemingly unrelated
        clues. It’s a fun exercise in lateral thinking and vocabulary.
      </p>
      <p>
        This site was built using Next.js with a focus on performance, accessibility and privacy.
        If you have feedback or puzzle suggestions, we’d love to hear from you. Get in touch via
        the contact page.
      </p>
    </main>
  );
}
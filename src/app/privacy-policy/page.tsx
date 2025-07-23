export const metadata = {
  title: 'Privacy Policy',
  description: 'Understand how BridgeWord collects and uses your data, including cookies and analytics.',
};

export default function PrivacyPolicyPage() {
  return (
    <main className="max-w-2xl mx-auto p-4 space-y-4">
      <h1 className="text-3xl font-bold">Privacy Policy</h1>
      <p>Last updated: 20 July 2025</p>
      <p>
        We respect your privacy and are committed to protecting it. This policy explains how
        BridgeWord (“we”, “us”, or “our”) collects, uses, and shares information about you when you
        use our website.
      </p>
      <h2 className="text-2xl font-semibold mt-4">Information We Collect</h2>
      <p>
        We collect minimal personal data. When you play the game anonymously we store your guesses
        locally in your browser. If you opt in to cookies, we use Google Analytics to understand
        website usage and Google AdSense to serve ads. These services may collect your IP address
        and device information.
      </p>
      <h2 className="text-2xl font-semibold mt-4">Cookies</h2>
      <p>
        Cookies are small text files stored on your device. We use cookies for essential site
        functionality and, with your consent, for analytics and advertising. You can accept or
        reject non-essential cookies via the banner that appears on your first visit.
      </p>
      <h2 className="text-2xl font-semibold mt-4">How We Use Your Information</h2>
      <ul className="list-disc pl-6 space-y-2">
        <li>To provide and improve the BridgeWord game experience.</li>
        <li>To personalise ads (if consented) via Google AdSense.</li>
        <li>To analyse website performance via Google Analytics.</li>
      </ul>
      <h2 className="text-2xl font-semibold mt-4">Your Choices</h2>
      <p>
        You can accept or reject cookies at any time by clicking the “Change cookie settings” link
        in the site footer. Rejecting cookies will prevent us from loading analytics and ads.
      </p>
      <h2 className="text-2xl font-semibold mt-4">Contact Us</h2>
      <p>
        If you have any questions about this Privacy Policy, please contact us at
        <a href="mailto:support@YOURDOMAIN.com" className="text-blue-600 underline ml-1">support@YOURDOMAIN.com</a>.
      </p>
    </main>
  );
}
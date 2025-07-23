export const metadata = {
  title: 'Terms of Service',
  description: 'Review the terms and conditions for using the BridgeWord website and game.',
};

export default function TermsPage() {
  return (
    <main className="max-w-2xl mx-auto p-4 space-y-4">
      <h1 className="text-3xl font-bold">Terms of Service</h1>
      <p>Last updated: 20 July 2025</p>
      <p>
        By accessing or using BridgeWord (“the Service”) you agree to be bound by these Terms of
        Service. If you disagree with any part of the terms then you may not access the Service.
      </p>
      <h2 className="text-2xl font-semibold mt-4">Use of Service</h2>
      <p>
        BridgeWord is provided for personal, non-commercial use only. You may not copy, distribute
        or create derivative works from the content without prior written consent.
      </p>
      <h2 className="text-2xl font-semibold mt-4">Accounts</h2>
      <p>
        You are not required to create an account to play BridgeWord. If you choose to register in
        the future, you must provide accurate information and are responsible for maintaining the
        confidentiality of your account.
      </p>
      <h2 className="text-2xl font-semibold mt-4">Limitation of Liability</h2>
      <p>
        BridgeWord and its owners shall not be liable for any indirect, incidental, special,
        consequential or punitive damages arising from your use of the Service.
      </p>
      <h2 className="text-2xl font-semibold mt-4">Changes</h2>
      <p>
        We reserve the right, at our sole discretion, to modify or replace these Terms at any time.
        Continued use of the Service after any such changes constitutes acceptance of the new
        Terms.
      </p>
      <h2 className="text-2xl font-semibold mt-4">Contact Us</h2>
      <p>
        If you have any questions about these Terms, please contact us at
        <a href="mailto:support@YOURDOMAIN.com" className="text-blue-600 underline ml-1">support@YOURDOMAIN.com</a>.
      </p>
    </main>
  );
}
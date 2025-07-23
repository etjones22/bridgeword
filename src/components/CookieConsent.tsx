"use client";

import { useEffect, useState } from 'react';

/**
 * Simple GDPR/CCPA cookie consent banner. Stores the user's choice in
 * localStorage and exposes it via a custom event so that other components
 * (like ads or analytics) can react accordingly. If rejected, no
 * non-essential scripts should run.
 */
export default function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = typeof window !== 'undefined' ? localStorage.getItem('cookieConsent') : null;
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const handleChoice = (choice: 'accept' | 'reject') => {
    localStorage.setItem('cookieConsent', choice);
    window.dispatchEvent(new CustomEvent('cookie-consent', { detail: choice }));
    setVisible(false);
  };

  if (!visible) return null;
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 bg-white shadow-md p-4 text-sm flex flex-col sm:flex-row sm:items-center justify-between space-y-3 sm:space-y-0 sm:space-x-4">
      <p className="flex-1">
        We use cookies to personalize content and ads, to provide social media features and to analyse our traffic. You can accept or reject non-essential cookies.
      </p>
      <div className="flex space-x-2">
        <button
          onClick={() => handleChoice('reject')}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
        >
          Reject
        </button>
        <button
          onClick={() => handleChoice('accept')}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Accept
        </button>
      </div>
    </div>
  );
}
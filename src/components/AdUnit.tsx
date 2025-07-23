"use client";

import { useEffect, useRef } from 'react';

interface AdUnitProps {
  /** The AdSense slot ID assigned in your account */
  slot: string;
  /** Additional CSS classes for styling */
  className?: string;
}

/**
 * Render a Google AdSense ad unit. The ad only renders after the user
 * accepts cookies via the CookieConsentBanner. When consent is given,
 * the adsbygoogle script will be invoked to fill the slot. If no consent
 * has been granted, the ad slot remains empty.
 */
export default function AdUnit({ slot, className }: AdUnitProps) {
  const adRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function maybeLoadAd() {
      const consent = localStorage.getItem('cookieConsent');
      if (consent === 'accept' && (window as any).adsbygoogle && adRef.current) {
        try {
          (window as any).adsbygoogle.push({});
        } catch (err) {
          // ignore errors when ad blockers are present
        }
      }
    }
    // Run once on mount
    maybeLoadAd();
    // Listen for future consent changes
    window.addEventListener('cookie-consent', maybeLoadAd);
    return () => {
      window.removeEventListener('cookie-consent', maybeLoadAd);
    };
  }, []);

  return (
    <div className={className}>
      <ins
        ref={adRef}
        className="adsbygoogle block"
        style={{ display: 'block' }}
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_ID ?? 'ca-pub-XXXXXXXXXXXXXXXX'}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
}
"use client";

import { useEffect } from 'react';

export default function Analytics() {
  useEffect(() => {
    function loadAnalytics() {
      const consent = localStorage.getItem('cookieConsent');
      if (consent === 'accept') {
        if (!(window as any).gtag) {
          // Load the gtag script
          const script = document.createElement('script');
          script.src = `https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID ?? 'G-XXXXXXXXXX'}`;
          script.async = true;
          document.head.appendChild(script);
          (window as any).dataLayer = (window as any).dataLayer || [];
          function gtag(...args: any[]) {
            (window as any).dataLayer.push(args);
          }
          (window as any).gtag = gtag;
          gtag('js', new Date());
          gtag('config', process.env.NEXT_PUBLIC_GA_ID ?? 'G-XXXXXXXXXX');
        }
      }
    }
    loadAnalytics();
    window.addEventListener('cookie-consent', loadAnalytics);
    return () => window.removeEventListener('cookie-consent', loadAnalytics);
  }, []);
  return null;
}
import './globals.css';
import { ReactNode } from 'react';
import CookieConsentBanner from '../components/CookieConsent';
import NavBar from '../components/NavBar';
import Analytics from '../components/Analytics';

// Define some global metadata. We set sensible defaults but they can be
// overridden in individual pages via the metadata export.
export const metadata = {
  title: {
    default: 'BridgeWord – Daily word bridge game',
    template: '%s | BridgeWord'
  },
  description: 'Play BridgeWord: a daily puzzle where one secret word bridges four clues to form common phrases.',
  openGraph: {
    title: 'BridgeWord',
    description: 'One secret word bridges four clues. Can you find it? Play today’s puzzle and browse the archive.',
    url: 'https://YOURDOMAIN.com',
    siteName: 'BridgeWord',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'BridgeWord logo'
      }
    ],
    locale: 'en_GB',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BridgeWord – Daily word bridge game',
    description: 'Guess the bridge that connects four clues.',
    creator: '@yourhandle',
    images: ['/og-image.png']
  }
};

// Root layout component. Inserts the AdSense script and wraps all pages in a
// cookie consent banner so that ads and analytics only load after consent.
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/**
         * AdSense: defer loading until after cookies are accepted via the
         * CookieConsentBanner. We include the script tag here so that it
         * downloads but does nothing until window.adsbygoogle.push() is called.
         */}
        <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_ID ?? 'ca-pub-XXXXXXXXXXXXXXXX'}`}
          crossOrigin="anonymous"
        ></script>
      </head>
      <body className="min-h-screen bg-white text-gray-900 flex flex-col">
        <NavBar />
        <div className="flex-1">
          {children}
        </div>
        <CookieConsentBanner />
        <Analytics />
      </body>
    </html>
  );
}
import { NextResponse } from 'next/server';

export async function GET() {
  const body = `google.com, ${process.env.NEXT_PUBLIC_ADSENSE_ID ?? 'pub-XXXXXXXXXXXXXXXX'}, DIRECT, f08c47fec0942fa0`;
  return new NextResponse(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
import { NextResponse } from 'next/server';

export async function GET() {
  const host = process.env.SITE_URL ?? 'https://YOURDOMAIN.com';
  const body = `User-agent: *\nAllow: /\nSitemap: ${host}/sitemap.xml`;
  return new NextResponse(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8'
    }
  });
}
import { NextResponse } from 'next/server';
import prisma from '../../lib/prisma';

export async function GET() {
  const host = process.env.SITE_URL ?? 'https://YOURDOMAIN.com';
  const puzzles = await prisma.puzzle.findMany({ select: { date: true } });
  const urls = [
    '',
    '/about',
    '/privacy-policy',
    '/terms',
    '/contact',
    '/archive',
  ].map((path) => `${host}${path}`);
  const puzzleUrls = puzzles.map((p) => `${host}/?date=${p.date}`);
  const allUrls = [...urls, ...puzzleUrls];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    allUrls
      .map((url) => {
        return `<url><loc>${url}</loc></url>`;
      })
      .join('\n') +
    '\n</urlset>';
  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml'
    }
  });
}
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }
    // In production you could send this data to an email service such as
    // Nodemailer, SendGrid or Formspree. Here we simply log it and return success.
    console.info('Contact form submission', { name, email, message });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
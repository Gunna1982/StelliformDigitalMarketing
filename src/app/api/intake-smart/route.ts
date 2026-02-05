import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { notifySlackNewLead } from '@/lib/slack';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// IntakeSmart submissions are intentionally separated from /api/contact
// so we can track funnel performance, lead quality, and future PDF/export features.

type IntakeSmartPayload = {
  // Required
  firstName: string;
  lastName: string;
  phone: string;

  // Optional
  email?: string;
  practiceArea?: string; // PI, med-mal, etc.
  location?: string; // Orlando, etc.
  message?: string;

  // Attribution
  source?: string;
  medium?: string;
  campaign?: string;
  referrer?: string;
  landingPage?: string;

  // Raw structured payload from the multi-step form
  payload?: unknown;
};

function digitsOnly(s: string) {
  return (s || '').replace(/\D/g, '');
}

export async function GET() {
  return NextResponse.json(
    {
      ok: true,
      info: 'IntakeSmart endpoint is ready. Submit via POST with JSON (firstName, lastName, phone, optional email/message).',
      methods: ['POST'],
    },
    { status: 200 }
  );
}

export async function POST(request: Request) {
  const timestamp = new Date().toISOString();

  try {
    const body: IntakeSmartPayload = await request.json();

    const firstName = (body.firstName || '').trim();
    const lastName = (body.lastName || '').trim();
    const phone = (body.phone || '').trim();
    const fullName = `${firstName} ${lastName}`.trim();

    if (!firstName || !lastName || !phone) {
      return NextResponse.json(
        { ok: false, error: 'firstName, lastName, and phone are required' },
        { status: 400 }
      );
    }

    if (digitsOnly(phone).length < 10) {
      return NextResponse.json({ ok: false, error: 'Invalid phone number' }, { status: 400 });
    }

    const email = body.email?.toLowerCase().trim();
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return NextResponse.json({ ok: false, error: 'Invalid email address' }, { status: 400 });
      }
    }

    const userAgent = request.headers.get('user-agent') || undefined;
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      undefined;
    const referer = request.headers.get('referer') || undefined;

    console.log(`[${timestamp}] [INTAKE_SMART] Received submission`, {
      name: fullName,
      phone,
      email,
      practiceArea: body.practiceArea,
      location: body.location,
    });

    const structuredMessageParts = [
      `Phone: ${phone}`,
      body.practiceArea ? `Practice area: ${body.practiceArea}` : null,
      body.location ? `Location: ${body.location}` : null,
      body.message ? `Message: ${body.message}` : null,
      body.payload ? `Payload: ${JSON.stringify(body.payload)}` : null,
    ].filter(Boolean);

    const lead = await prisma.lead.create({
      data: {
        name: fullName,
        email: email || 'intakesmart@stelliformdigital.com',
        project: `IntakeSmart${body.location ? ` — ${body.location}` : ''}${body.practiceArea ? ` — ${body.practiceArea}` : ''}`,
        message: structuredMessageParts.join('\n'),
        source: body.source || 'website',
        medium: body.medium || 'intakesmart',
        campaign: body.campaign || null,
        referrer: referer || body.referrer || null,
        landingPage: body.landingPage || null,
        userAgent,
        ip,
        status: 'new',
      },
    });

    await notifySlackNewLead({
      name: lead.name,
      email: lead.email,
      project: lead.project || undefined,
      message: lead.message || undefined,
      leadId: lead.id,
    });

    await prisma.lead.update({ where: { id: lead.id }, data: { notifiedAt: new Date() } });

    return NextResponse.json({ ok: true, id: lead.id }, { status: 200 });
  } catch (error) {
    console.error(`[${timestamp}] [INTAKE_SMART][ERROR]`, error);
    return NextResponse.json(
      { ok: false, error: 'Failed to submit IntakeSmart form. Please try again.' },
      { status: 500 }
    );
  }
}

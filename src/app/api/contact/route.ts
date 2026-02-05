import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { notifySlackNewLead } from '@/lib/slack';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

interface ContactFormData {
  // New structured fields (preferred)
  firstName?: string;
  lastName?: string;
  phone?: string;
  preferredContactMethod?: string;
  bestTimeToContact?: string;
  details?: string;

  // Back-compat (older form)
  name?: string;
  email: string;
  project?: string;
  message?: string;

  // Attribution fields (optional, can be added from client)
  source?: string;
  medium?: string;
  campaign?: string;
  referrer?: string;
  landingPage?: string;
}

export async function POST(request: Request) {
  const timestamp = new Date().toISOString();

  try {
    // Parse request body
    const body: ContactFormData = await request.json();

    const fullName = (body.name || `${body.firstName ?? ''} ${body.lastName ?? ''}`.trim()).trim();

    console.log(`[${timestamp}] [CONTACT] Received submission:`, {
      name: fullName,
      email: body.email,
      phone: body.phone,
      preferredContactMethod: body.preferredContactMethod
    });

    // Validate required fields
    if (!fullName || !body.email) {
      return NextResponse.json(
        { ok: false, error: 'Name and email are required' },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { ok: false, error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Get request metadata
    const userAgent = request.headers.get('user-agent') || undefined;
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
               request.headers.get('x-real-ip') ||
               undefined;
    const referer = request.headers.get('referer') || undefined;

    // Create lead in database
    const structuredMessageParts = [
      body.phone ? `Phone: ${body.phone}` : null,
      body.preferredContactMethod ? `Preferred contact: ${body.preferredContactMethod}` : null,
      body.bestTimeToContact ? `Best time: ${body.bestTimeToContact}` : null,
      body.details ? `Details: ${body.details}` : null,
      body.message ? `Message: ${body.message}` : null,
    ].filter(Boolean);

    const lead = await prisma.lead.create({
      data: {
        name: fullName,
        email: body.email.toLowerCase().trim(),
        // Reuse existing columns (no migration needed)
        project: (body.project || body.preferredContactMethod || 'Free teardown request').trim(),
        message: structuredMessageParts.length ? structuredMessageParts.join('\n') : null,
        source: body.source || 'website',
        medium: body.medium || 'contact_form',
        campaign: body.campaign || null,
        referrer: referer || body.referrer || null,
        landingPage: body.landingPage || null,
        userAgent,
        ip,
        status: 'new'
      }
    });

    console.log(`[${timestamp}] [CONTACT][DB] Lead created:`, {
      id: lead.id,
      email: lead.email
    });

    // Send Slack notification
    await notifySlackNewLead({
      name: lead.name,
      email: lead.email,
      project: lead.project || undefined,
      message: lead.message || undefined,
      leadId: lead.id
    });

    // Update lead with notification timestamp
    await prisma.lead.update({
      where: { id: lead.id },
      data: { notifiedAt: new Date() }
    });

    return NextResponse.json(
      { ok: true, id: lead.id },
      { status: 200 }
    );

  } catch (error) {
    console.error(`[${timestamp}] [CONTACT][ERROR]`, error);

    return NextResponse.json(
      { ok: false, error: 'Failed to submit form. Please try again.' },
      { status: 500 }
    );
  }
}

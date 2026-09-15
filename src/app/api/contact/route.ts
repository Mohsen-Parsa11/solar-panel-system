import { detectBot, fixedWindow } from '@arcjet/next';
import { NextResponse } from 'next/server';
import arcjet from '@/libs/Arcjet';
import { sendMail } from '@/libs/Mail';

export const runtime = 'nodejs';

type ContactRequest = {
  firstName?: unknown;
  lastName?: unknown;
  email?: unknown;
  phone?: unknown;
  country?: unknown;
  company?: unknown;
  message?: unknown;
};

type ContactMessage = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  company: string;
  message: string;
};

const contactLimiter = arcjet
  .withRule(
    detectBot({
      mode: 'LIVE',
      allow: [],
    }),
  )
  .withRule(
    fixedWindow({
      mode: 'LIVE',
      max: 3,
      window: '10m',
    }),
  );

const fallbackHits = new Map<string, { count: number; resetAt: number }>();
const fallbackLimit = {
  max: 3,
  windowMs: 10 * 60 * 1000,
};

function getClientId(request: Request) {
  return request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    || request.headers.get('x-real-ip')
    || 'unknown';
}

function isFallbackRateLimited(request: Request) {
  const now = Date.now();
  const clientId = getClientId(request);
  const current = fallbackHits.get(clientId);

  if (!current || current.resetAt <= now) {
    fallbackHits.set(clientId, {
      count: 1,
      resetAt: now + fallbackLimit.windowMs,
    });
    return false;
  }

  current.count += 1;
  fallbackHits.set(clientId, current);

  return current.count > fallbackLimit.max;
}

function getAdminEmails() {
  const raw = process.env.ADMIN_EMAIL ?? process.env.ADMIN_EMAIL;

  if (!raw) {
    throw new Error('CONTACT_ADMIN_EMAILS is required');
  }

  const emails = raw
    .split(',')
    .map(email => email.trim())
    .filter(Boolean);

  if (emails.length === 0) {
    throw new Error('CONTACT_ADMIN_EMAILS must include at least one email');
  }

  return emails;
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function normalizeMessage(data: ContactRequest): ContactMessage | null {
  if (
    !isNonEmptyString(data.firstName)
    || !isNonEmptyString(data.lastName)
    || !isNonEmptyString(data.email)
    || !isNonEmptyString(data.phone)
    || !isNonEmptyString(data.country)
    || !isNonEmptyString(data.company)
    || !isNonEmptyString(data.message)
  ) {
    return null;
  }

  const email = data.email.trim();

  if (!isValidEmail(email)) {
    return null;
  }

  return {
    firstName: data.firstName.trim(),
    lastName: data.lastName.trim(),
    email,
    phone: data.phone.trim(),
    country: data.country.trim(),
    company: data.company.trim(),
    message: data.message.trim(),
  };
}

function isValidEmail(email: string) {
  const [localPart, domain, ...extraParts] = email.split('@');

  if (!localPart || !domain || extraParts.length > 0) {
    return false;
  }

  return domain.includes('.') && !email.includes(' ');
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll('\'', '&#039;');
}

function adminTemplate(data: ContactMessage) {
  const fullName = `${data.firstName} ${data.lastName}`;

  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827;">
      <h2 style="margin: 0 0 16px; color: #00496E;">New contact request</h2>
      <p style="margin: 0 0 18px;">A customer submitted the contact form on Dawood Hewadwal.</p>
      <table style="border-collapse: collapse; width: 100%; max-width: 640px;">
        <tbody>
          ${detailRow('Name', fullName)}
          ${detailRow('Email', data.email)}
          ${detailRow('Phone', data.phone)}
          ${detailRow('Country', data.country)}
          ${detailRow('Company', data.company)}
        </tbody>
      </table>
      <h3 style="margin: 24px 0 8px; color: #111827;">Message</h3>
      <div style="white-space: pre-line; border: 1px solid #e5e7eb; border-radius: 6px; padding: 14px; background: #f9fafb;">
        ${escapeHtml(data.message)}
      </div>
    </div>
  `;
}

function customerTemplate(data: ContactMessage) {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827;">
      <h2 style="margin: 0 0 16px; color: #00496E;">We received your request</h2>
      <p>Hello ${escapeHtml(data.firstName)},</p>
      <p>Thank you for contacting Dawood Hewadwal. Our team has received your message and will get back to you soon.</p>
      <p style="margin-top: 20px;">Here is a copy of your message:</p>
      <div style="white-space: pre-line; border: 1px solid #e5e7eb; border-radius: 6px; padding: 14px; background: #f9fafb;">
        ${escapeHtml(data.message)}
      </div>
      <p style="margin-top: 22px;">Regards,<br />Dawood Hewadwal Team</p>
    </div>
  `;
}

function detailRow(label: string, value: string) {
  return `
    <tr>
      <td style="border: 1px solid #e5e7eb; padding: 10px; width: 140px; font-weight: 700; background: #f9fafb;">${escapeHtml(label)}</td>
      <td style="border: 1px solid #e5e7eb; padding: 10px;">${escapeHtml(value)}</td>
    </tr>
  `;
}

function textCopy(data: ContactMessage) {
  return `
New contact request

Name: ${data.firstName} ${data.lastName}
Email: ${data.email}
Phone: ${data.phone}
Country: ${data.country}
Company: ${data.company}

Message:
${data.message}
  `.trim();
}

export async function POST(request: Request) {
  if (process.env.ARCJET_KEY) {
    const decision = await contactLimiter.protect(request);

    if (decision.isDenied()) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }
  } else if (isFallbackRateLimited(request)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  let payload: ContactRequest;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 });
  }

  const data = normalizeMessage(payload);
  if (!data) {
    return NextResponse.json({ error: 'Invalid contact request' }, { status: 400 });
  }

  let adminEmails: string[];

  try {
    adminEmails = getAdminEmails();
  } catch {
    return NextResponse.json({ error: 'Contact email is not configured' }, { status: 500 });
  }

  const fullName = `${data.firstName} ${data.lastName}`;

  try {
    await Promise.all([
      sendMail({
        to: adminEmails.join(','),
        subject: `New contact request from ${fullName}`,
        replyTo: data.email,
        text: textCopy(data),
        html: adminTemplate(data),
      }),
      sendMail({
        to: data.email,
        subject: 'We received your Dawood Hewadwal request',
        text: `Hello ${data.firstName},\n\nThank you for contacting Dawood Hewadwal. Our team has received your message and will get back to you soon.\n\nYour message:\n${data.message}`,
        html: customerTemplate(data),
      }),
    ]);
  } catch (error) {
    console.error('Error sending contact request:', error);

    if (error instanceof Error) {
      console.error(error.message);
      console.error(error.stack);
    }
    return NextResponse.json({ error: 'Unable to send contact request' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

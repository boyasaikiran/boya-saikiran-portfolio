import type { IncomingMessage, ServerResponse } from 'http';
import { Resend } from 'resend';
import * as dotenv from 'dotenv';

// Load environment variables if not already loaded (for local dev / preview)
dotenv.config();

// Rate limiting in-memory store: Map<IP, Array<timestamp>>
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

// Clean up old entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [ip, timestamps] of rateLimitMap.entries()) {
    const validTimestamps = timestamps.filter(t => now - t < RATE_LIMIT_WINDOW_MS);
    if (validTimestamps.length === 0) {
      rateLimitMap.delete(ip);
    } else {
      rateLimitMap.set(ip, validTimestamps);
    }
  }
}, 5 * 60 * 1000).unref?.();

interface ContactRequestBody {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  honeypot?: string;
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  const recentTimestamps = timestamps.filter(t => now - t < RATE_LIMIT_WINDOW_MS);
  
  if (recentTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }
  
  recentTimestamps.push(now);
  rateLimitMap.set(ip, recentTimestamps);
  return true;
}

function sendJsonResponse(res: ServerResponse, statusCode: number, data: Record<string, unknown>) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.end(JSON.stringify(data));
}

function parseBody(req: IncomingMessage): Promise<ContactRequestBody> {
  return new Promise((resolve, reject) => {
    // If body was already parsed by a framework (e.g. Vercel)
    if ((req as any).body && typeof (req as any).body === 'object') {
      return resolve((req as any).body);
    }

    let rawData = '';
    req.on('data', chunk => {
      rawData += chunk;
      if (rawData.length > 50000) { // 50KB limit to prevent payload abuse
        reject(new Error('Payload too large'));
      }
    });

    req.on('end', () => {
      try {
        if (!rawData.trim()) {
          resolve({});
        } else {
          resolve(JSON.parse(rawData));
        }
      } catch (err) {
        reject(new Error('Invalid JSON payload'));
      }
    });

    req.on('error', err => reject(err));
  });
}

export async function handleContactRequest(req: IncomingMessage, res: ServerResponse) {
  // Handle preflight CORS
  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.end();
    return;
  }

  if (req.method !== 'POST') {
    return sendJsonResponse(res, 405, {
      success: false,
      error: 'Method Not Allowed. Use POST.'
    });
  }

  // Get client IP for rate limiting
  const forwarded = req.headers['x-forwarded-for'];
  const clientIp = typeof forwarded === 'string'
    ? forwarded.split(',')[0].trim()
    : req.socket.remoteAddress || 'unknown';

  if (!checkRateLimit(clientIp)) {
    return sendJsonResponse(res, 429, {
      success: false,
      error: 'Rate limit exceeded. Please wait a few minutes before trying again.'
    });
  }

  let body: ContactRequestBody;
  try {
    body = await parseBody(req);
  } catch (err: any) {
    return sendJsonResponse(res, 400, {
      success: false,
      error: err.message || 'Malformed request body.'
    });
  }

  const { name, email, subject, message, honeypot } = body;

  // 1. Honeypot check (anti-bot)
  if (honeypot && honeypot.trim() !== '') {
    // Silently succeed or return rejected to trap bots without sending email
    return sendJsonResponse(res, 200, {
      success: true,
      message: 'MESSAGE TRANSMITTED SUCCESSFULLY. I\'ll get back to you soon.'
    });
  }

  // 2. Strict validation
  const errors: Record<string, string> = {};

  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters long.';
  } else if (name.trim().length > 100) {
    errors.name = 'Name must not exceed 100 characters.';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
    errors.email = 'A valid email address is required.';
  } else if (email.trim().length > 255) {
    errors.email = 'Email address is too long.';
  }

  if (!subject || typeof subject !== 'string' || subject.trim().length < 2) {
    errors.subject = 'Subject must be at least 2 characters long.';
  } else if (subject.trim().length > 200) {
    errors.subject = 'Subject must not exceed 200 characters.';
  }

  if (!message || typeof message !== 'string' || message.trim().length < 15) {
    errors.message = 'Message must be at least 15 characters long.';
  } else if (message.trim().length > 5000) {
    errors.message = 'Message must not exceed 5000 characters.';
  }

  if (Object.keys(errors).length > 0) {
    return sendJsonResponse(res, 400, {
      success: false,
      error: 'Validation failed',
      errors
    });
  }

  const safeName = name!.trim();
  const safeEmail = email!.trim();
  const safeSubject = subject!.trim();
  const safeMessage = message!.trim();

  // 3. Resend configuration
  const resendApiKey = process.env.RESEND_API_KEY;
  const recipientEmail = process.env.RECIPIENT_EMAIL || 'boyasaikiran37@gmail.com';
  const fromEmail = process.env.RESEND_FROM_EMAIL || 'Portfolio Contact <onboarding@resend.dev>';

  if (!resendApiKey || resendApiKey === 're_your_api_key_here') {
    console.error('[API Error] RESEND_API_KEY is not configured or using placeholder in server environment.');
    return sendJsonResponse(res, 500, {
      success: false,
      error: 'TRANSMISSION FAILED. Email delivery service is not configured.'
    });
  }

  try {
    const resend = new Resend(resendApiKey);

    // Escape HTML for safe email rendering
    const sanitizeHtml = (str: string) =>
      str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');

    const htmlContent = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0D1018; color: #E5E7EB; padding: 32px; border-radius: 12px; border: 1px solid #272D3A; max-width: 600px; margin: 0 auto;">
        <div style="border-bottom: 1px solid #272D3A; padding-bottom: 16px; margin-bottom: 24px;">
          <h2 style="color: #FF3548; font-size: 20px; font-weight: 700; margin: 0 0 4px 0; letter-spacing: 0.5px;">THE WEB OF IDEAS &mdash; PORTFOLIO INQUIRY</h2>
          <span style="font-size: 12px; color: #75E5ED; font-family: monospace;">STATUS: TRANSMISSION RECEIVED</span>
        </div>

        <div style="margin-bottom: 20px;">
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr>
              <td style="color: #8D94A3; padding: 6px 0; width: 90px; font-weight: 600;">SENDER:</td>
              <td style="color: #FFFFFF; padding: 6px 0; font-weight: bold;">${sanitizeHtml(safeName)}</td>
            </tr>
            <tr>
              <td style="color: #8D94A3; padding: 6px 0; font-weight: 600;">EMAIL:</td>
              <td style="color: #75E5ED; padding: 6px 0;"><a href="mailto:${sanitizeHtml(safeEmail)}" style="color: #75E5ED; text-decoration: none;">${sanitizeHtml(safeEmail)}</a></td>
            </tr>
            <tr>
              <td style="color: #8D94A3; padding: 6px 0; font-weight: 600;">SUBJECT:</td>
              <td style="color: #FFFFFF; padding: 6px 0;">${sanitizeHtml(safeSubject)}</td>
            </tr>
            <tr>
              <td style="color: #8D94A3; padding: 6px 0; font-weight: 600;">TIMESTAMP:</td>
              <td style="color: #8D94A3; padding: 6px 0; font-family: monospace; font-size: 12px;">${new Date().toISOString()}</td>
            </tr>
          </table>
        </div>

        <div style="background-color: #121621; border: 1px solid #272D3A; border-radius: 8px; padding: 18px; margin-bottom: 24px;">
          <div style="font-size: 11px; font-family: monospace; color: #8D94A3; text-transform: uppercase; margin-bottom: 8px; letter-spacing: 0.5px;">MESSAGE PAYLOAD:</div>
          <div style="font-size: 14px; line-height: 1.6; color: #F5F6F8; white-space: pre-wrap;">${sanitizeHtml(safeMessage)}</div>
        </div>

        <div style="border-top: 1px solid #272D3A; pt: 16px; font-size: 12px; color: #8D94A3; font-family: monospace; text-align: center;">
          Transmitted from Boya Saikiran's Portfolio &bull; Reply directly to this email to respond to ${sanitizeHtml(safeName)}.
        </div>
      </div>
    `;

    const plainTextContent = `
[THE WEB OF IDEAS - PORTFOLIO INQUIRY]

From: ${safeName} (${safeEmail})
Subject: ${safeSubject}
Timestamp: ${new Date().toISOString()}

Message:
${safeMessage}

--
Transmitted from Boya Saikiran's Portfolio
Reply directly to this email to contact the sender.
    `.trim();

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [recipientEmail],
      replyTo: safeEmail,
      subject: `[Portfolio Inquiry] ${safeSubject} - ${safeName}`,
      text: plainTextContent,
      html: htmlContent
    });

    if (error) {
      console.error('[Resend Error]', error);
      return sendJsonResponse(res, 500, {
        success: false,
        error: error.message || 'TRANSMISSION FAILED. Please try again later.'
      });
    }

    return sendJsonResponse(res, 200, {
      success: true,
      id: data?.id,
      message: 'MESSAGE TRANSMITTED SUCCESSFULLY. I\'ll get back to you soon.'
    });

  } catch (err: any) {
    console.error('[Server Error]', err);
    return sendJsonResponse(res, 500, {
      success: false,
      error: 'TRANSMISSION FAILED. Please try again later.'
    });
  }
}

// Default export for Vercel Serverless Functions
export default async function handler(req: any, res: any) {
  return handleContactRequest(req, res);
}

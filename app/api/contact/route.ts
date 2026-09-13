import { NextResponse } from "next/server";
import { Resend } from "resend";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildEmailHtml({ name, email, message }: { name: string; email: string; message: string }) {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");
  const timestamp = new Date().toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "America/New_York",
  });

  return `
<div style="background:#f1f2f3; padding:32px 16px; font-family:Arial, Helvetica, sans-serif;">
  <table role="presentation" width="100%" style="max-width:560px; margin:0 auto; border-collapse:collapse; background:#f1f2f3; border:2px solid #1b1d1f;">
    <tr>
      <td colspan="2" style="height:6px; background:#c8522a; line-height:6px; font-size:0;">&nbsp;</td>
    </tr>
    <tr>
      <td style="padding:16px 28px; border-bottom:2px solid #1b1d1f; font-weight:800; font-size:14px; letter-spacing:.06em; color:#1b1d1f;">CRLNA</td>
      <td style="padding:16px 28px; border-bottom:2px solid #1b1d1f; text-align:right; font-size:10.5px; font-weight:600; letter-spacing:.16em; text-transform:uppercase; color:#5b6165;">New message</td>
    </tr>
    <tr>
      <td colspan="2" style="padding:32px 28px 8px;">
        <div style="font-size:10.5px; font-weight:600; letter-spacing:.16em; text-transform:uppercase; color:#5b6165; margin-bottom:8px;">From</div>
        <div style="font-family:Georgia, 'Times New Roman', serif; font-weight:800; font-size:30px; letter-spacing:-.02em; color:#1b1d1f; line-height:1.15;">${safeName}</div>
      </td>
    </tr>
    <tr>
      <td colspan="2" style="padding:16px 28px 28px;">
        <div style="font-size:10.5px; font-weight:600; letter-spacing:.16em; text-transform:uppercase; color:#5b6165; margin-bottom:6px;">Direct</div>
        <a href="mailto:${safeEmail}" style="font-size:16px; font-weight:800; color:#c8522a; text-decoration:none;">${safeEmail}</a>
      </td>
    </tr>
    <tr>
      <td colspan="2" style="padding:0 28px 32px;">
        <div style="font-size:10.5px; font-weight:600; letter-spacing:.16em; text-transform:uppercase; color:#5b6165; margin-bottom:8px;">Message</div>
        <div style="border:2px solid #1b1d1f; background:#e6e8ea; padding:18px 20px; font-size:14px; line-height:1.6; color:#1b1d1f;">${safeMessage}</div>
      </td>
    </tr>
    <tr>
      <td colspan="2" style="padding:14px 28px; border-top:2px solid #1b1d1f; font-size:10.5px; color:#5b6165;">Sent from the CRLNA contact form &middot; ${timestamp} ET</td>
    </tr>
  </table>
</div>`;
}

function buildEmailText({ name, email, message }: { name: string; email: string; message: string }) {
  return `New message from ${name} (${email})\n\n${message}`;
}

export async function POST(request: Request) {
  const { name, email, message } = await request.json();

  if (typeof name !== "string" || !name.trim()) {
    return NextResponse.json({ error: "A name is required." }, { status: 400 });
  }
  if (typeof email !== "string" || !emailPattern.test(email)) {
    return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
  }
  if (typeof message !== "string" || !message.trim()) {
    return NextResponse.json({ error: "A message is required." }, { status: 400 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  const { error } = await resend.emails.send({
    from: "CRLNA Contact Form <onboarding@resend.dev>",
    to: process.env.CONTACT_TO_EMAIL!,
    replyTo: email,
    subject: `New message from ${name}`,
    html: buildEmailHtml({ name, email, message }),
    text: buildEmailText({ name, email, message }),
  });

  if (error) {
    return NextResponse.json({ error: "Failed to send message." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}

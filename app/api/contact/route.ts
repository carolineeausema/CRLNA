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

  const firstName = safeName.split(" ")[0];
  const sans = "'Hanken Grotesk', 'Helvetica Neue', Helvetica, Arial, sans-serif";
  const label = `font-size:12px; font-weight:600; letter-spacing:.04em; text-transform:uppercase; color:#56625A;`;

  // Mirrors the site palette in globals.css: cream/paper ground, ink text, sage labels, mustard accent.
  return `
<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="color-scheme" content="light only" />
  <link href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600&display=swap" rel="stylesheet" />
</head>
<body style="margin:0; padding:0; background:#F3EEE5;">
<div style="background:#F3EEE5; padding:40px 16px; font-family:${sans}; color:#372621;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:580px; margin:0 auto; border-collapse:collapse;">
    <tr>
      <td style="padding:0 4px 18px; border-bottom:1px solid rgba(55,38,33,.25); font-size:14px; font-weight:500; color:#372621;">
        <span style="color:#BBA674;">&#10047;</span>&nbsp; 05
      </td>
      <td style="padding:0 4px 18px; border-bottom:1px solid rgba(55,38,33,.25); font-size:14px; font-weight:500; color:#372621; text-align:right;">
        New message
      </td>
    </tr>
    <tr>
      <td colspan="2" style="padding:36px 4px 8px;">
        <div style="${label} margin-bottom:10px;">From</div>
        <div style="font-weight:500; font-size:38px; line-height:1.1; letter-spacing:-.04em; color:#372621;">${safeName}</div>
        <a href="mailto:${safeEmail}" style="display:inline-block; margin-top:10px; font-size:16px; font-weight:500; color:#64432F; text-decoration:underline; text-underline-offset:3px;">${safeEmail}</a>
      </td>
    </tr>
    <tr>
      <td colspan="2" style="padding:28px 4px 8px;">
        <div style="${label} margin-bottom:10px;">Message</div>
        <div style="border:1px solid #372621; background:#FBF8F2; padding:24px; font-size:16px; line-height:1.6; color:#372621;">${safeMessage}</div>
      </td>
    </tr>
    <tr>
      <td colspan="2" style="padding:20px 4px 40px;">
        <a href="mailto:${safeEmail}" style="display:inline-block; background:#372621; color:#FBF8F2; border-radius:999px; padding:14px 24px; font-size:12px; font-weight:600; letter-spacing:.04em; text-transform:uppercase; text-decoration:none;">Reply to ${firstName} &rarr;</a>
      </td>
    </tr>
    <tr>
      <td colspan="2" style="background:#372621; padding:28px 28px 20px;">
        <div style="font-weight:500; font-size:56px; line-height:.85; letter-spacing:-.07em; color:#F3EEE5;">CRLNA<span style="color:#BBA674;">.</span></div>
        <div style="margin-top:22px; padding-top:14px; border-top:1px solid rgba(243,238,229,.2); font-size:13px; color:#AFACA2;">Sent from the contact form &middot; ${timestamp} ET</div>
      </td>
    </tr>
  </table>
</div>
</body>
</html>`;
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

  if (!process.env.RESEND_API_KEY || !process.env.CONTACT_TO_EMAIL) {
    console.error("Contact form: RESEND_API_KEY or CONTACT_TO_EMAIL is not set.");
    return NextResponse.json({ error: "Email is not configured." }, { status: 500 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  const { error } = await resend.emails.send({
    from: "CRLNA Contact Form <onboarding@resend.dev>",
    to: process.env.CONTACT_TO_EMAIL,
    replyTo: email,
    subject: `New message from ${name.replace(/[\r\n]+/g, " ").trim()}`,
    html: buildEmailHtml({ name, email, message }),
    text: buildEmailText({ name, email, message }),
  });

  if (error) {
    console.error("Contact form: Resend error", error);
    return NextResponse.json({ error: "Failed to send message." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}

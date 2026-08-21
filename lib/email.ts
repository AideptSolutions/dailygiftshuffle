// Transactional email via Resend's REST API (raw fetch, no SDK). Used for the
// Genie's magic sign-in links. In development without a RESEND_API_KEY the
// link is logged to the server console instead so the flow stays testable.

const FROM = () => process.env.GENIE_EMAIL_FROM || 'TheGiftShuffle <genie@thegiftshuffle.com>';

export async function sendMagicLink(to: string, link: string): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    if (process.env.NODE_ENV !== 'production') {
      console.log(`[email:dev] magic link for ${to}: ${link}`);
      return;
    }
    throw new Error('RESEND_API_KEY is not configured');
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: FROM(),
      to: [to],
      subject: 'Your sign-in link for TheGiftShuffle',
      html: [
        '<div style="font-family:Arial,Helvetica,sans-serif;max-width:480px;margin:0 auto;padding:24px">',
        '<h2 style="color:#1A202C;margin:0 0 12px">Rub the lamp</h2>',
        '<p style="color:#4A5568;font-size:15px;line-height:1.5;margin:0 0 20px">',
        'Click the button below to sign in to TheGiftShuffle. This link works once and expires in 15 minutes.',
        '</p>',
        `<a href="${link}" style="display:inline-block;background:#F04E30;color:#ffffff;font-weight:bold;`,
        'padding:12px 28px;border-radius:9999px;text-decoration:none;font-size:15px">Sign in</a>',
        '<p style="color:#A0AEC0;font-size:12px;margin:24px 0 0">',
        'If you did not request this, you can safely ignore this email.',
        '</p>',
        '</div>',
      ].join(''),
    }),
  });
  if (!res.ok) {
    throw new Error(`Resend send failed: HTTP ${res.status}`);
  }
}

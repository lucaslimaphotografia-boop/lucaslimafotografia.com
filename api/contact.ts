import { VercelRequest, VercelResponse } from '@vercel/node';

const RESEND_API = 'https://api.resend.com/emails';
// O remetente padrao "onboarding@resend.dev" so pode enviar para o e-mail da
// propria conta Resend (lucaslimaphotografia@gmail.com) enquanto o dominio
// lucaslimafotografia.com nao for verificado em resend.com/domains.
// Depois de verificar o dominio, defina nas variaveis de ambiente da Vercel:
//   CONTACT_TO_EMAIL=contato@lucaslimafotografia.com
//   CONTACT_FROM_EMAIL=Site Lucas Lima <contato@lucaslimafotografia.com>
const TO_EMAIL = process.env.CONTACT_TO_EMAIL || 'lucaslimaphotografia@gmail.com';
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || 'Site Lucas Lima <onboarding@resend.dev>';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface ContactPayload {
  name?: string;
  email?: string;
  type?: string;
  date?: string;
  location?: string;
  time?: string;
  guests?: string;
  planner?: string;
  found?: string;
  message?: string;
  consent?: boolean;
  lang?: string;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function row(label: string, value?: string) {
  if (!value || !value.trim()) return '';
  return `<tr><td style="padding:6px 12px;font-weight:bold;color:#111;white-space:nowrap;">${escapeHtml(label)}</td><td style="padding:6px 12px;color:#111;">${escapeHtml(value)}</td></tr>`;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Permitir apenas POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Habilitar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  try {
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY not configured');
      return res.status(500).json({
        error: 'API key not configured',
        message: 'RESEND_API_KEY environment variable is missing. Please configure it in Vercel settings.',
        help: 'Go to Vercel Dashboard > Settings > Environment Variables > Add RESEND_API_KEY'
      });
    }

    const body = (req.body || {}) as ContactPayload;
    const {
      name, email, type, date, location, time,
      guests, planner, found, message, consent, lang
    } = body;

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return res.status(400).json({ error: 'Missing required fields', message: 'name, email and message are required' });
    }
    if (!EMAIL_REGEX.test(email.trim())) {
      return res.status(400).json({ error: 'Invalid email' });
    }
    if (!consent) {
      return res.status(400).json({ error: 'Consent is required' });
    }

    const isPt = lang !== 'en';
    const subject = isPt
      ? `Novo contato pelo site — ${name}${type ? ' · ' + type : ''}`
      : `New website inquiry — ${name}${type ? ' · ' + type : ''}`;

    const rows = [
      row(isPt ? 'Nome' : 'Name', name),
      row('Email', email),
      row(isPt ? 'Tipo de evento' : 'Event type', type),
      row(isPt ? 'Data' : 'Date', date),
      row(isPt ? 'Local' : 'Location', location),
      row(isPt ? 'Horário' : 'Time', time),
      row(isPt ? 'Convidados' : 'Guests', guests),
      row(isPt ? 'Assessoria' : 'Planner', planner),
      row(isPt ? 'Como nos encontrou' : 'How they found us', found),
    ].join('');

    const html = `
      <div style="font-family:Helvetica,Arial,sans-serif;max-width:600px;margin:0 auto;">
        <h2 style="font-size:16px;text-transform:uppercase;letter-spacing:1px;">${isPt ? 'Novo contato pelo site' : 'New website inquiry'}</h2>
        <table style="border-collapse:collapse;width:100%;margin-bottom:16px;">${rows}</table>
        <p style="font-weight:bold;margin-bottom:4px;">${isPt ? 'Mensagem' : 'Message'}:</p>
        <p style="white-space:pre-wrap;border-left:3px solid #000;padding-left:12px;">${escapeHtml(message)}</p>
      </div>
    `;

    const resendResponse = await fetch(RESEND_API, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [TO_EMAIL],
        reply_to: email,
        subject,
        html,
      }),
    });

    if (!resendResponse.ok) {
      const errorData = await resendResponse.json().catch(() => ({}));
      console.error('Resend API error:', resendResponse.status, errorData);
      throw new Error(errorData.message || `Resend API returned ${resendResponse.status}`);
    }

    return res.status(200).json({ success: true });
  } catch (error: any) {
    console.error('Error sending contact email:', error);

    let errorMessage = 'Failed to send message';
    const details = error.message || 'Unknown error';

    if (details.includes('API key') || details.includes('401') || details.includes('Unauthorized')) {
      errorMessage = 'Authentication failed. Please check RESEND_API_KEY in Vercel settings.';
    } else if (details.includes('domain') || details.includes('verify')) {
      errorMessage = 'Sender domain not verified in Resend. Check the FROM address configuration.';
    }

    return res.status(500).json({
      error: errorMessage,
      details,
      help: 'Check Vercel logs for more details: Dashboard > Deployments > Functions > api/contact'
    });
  }
}

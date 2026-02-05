import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

const REQUIRED_FIELDS = ['name', 'email', 'message'];

const isNonEmptyString = (value: unknown): value is string =>
  typeof value === 'string' && value.trim().length > 0;

const normalizeValue = (value: unknown) =>
  typeof value === 'string' ? value.trim() : '';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const {
    name,
    email,
    type,
    date,
    location,
    time,
    guests,
    planner,
    found,
    message
  } = req.body || {};

  const payload = {
    name: normalizeValue(name),
    email: normalizeValue(email),
    type: normalizeValue(type),
    date: normalizeValue(date),
    location: normalizeValue(location),
    time: normalizeValue(time),
    guests: normalizeValue(guests),
    planner: normalizeValue(planner),
    found: normalizeValue(found),
    message: normalizeValue(message)
  };

  const missing = REQUIRED_FIELDS.filter((field) => !isNonEmptyString(payload[field]));
  if (missing.length > 0) {
    return res.status(400).json({
      error: 'Missing fields',
      message: `Campos obrigatórios: ${missing.join(', ')}`
    });
  }

  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = process.env.SMTP_PORT;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const mailTo = process.env.CONTACT_TO || 'contato@lucaslimafotografia.com';
  const mailFrom = process.env.CONTACT_FROM || smtpUser || mailTo;

  if (!smtpHost || !smtpPort || !smtpUser || !smtpPass) {
    return res.status(500).json({
      error: 'Server not configured',
      message:
        'SMTP não configurado. Defina SMTP_HOST, SMTP_PORT, SMTP_USER e SMTP_PASS no Vercel.'
    });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: Number(smtpPort),
      secure: Number(smtpPort) === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass
      }
    });

    const subjectParts = ['Novo contato', payload.name];
    if (payload.type) subjectParts.push(payload.type);

    const lines = [
      `Nome: ${payload.name}`,
      `Email: ${payload.email}`,
      payload.type ? `Tipo de evento: ${payload.type}` : null,
      payload.date ? `Data: ${payload.date}` : null,
      payload.location ? `Local do evento: ${payload.location}` : null,
      payload.time ? `Horário do evento: ${payload.time}` : null,
      payload.guests ? `Quantidade de convidados: ${payload.guests}` : null,
      payload.planner ? `Assessoria: ${payload.planner}` : null,
      payload.found ? `Como encontrou: ${payload.found}` : null,
      '',
      'Mensagem:',
      payload.message
    ].filter(Boolean);

    await transporter.sendMail({
      from: mailFrom,
      to: mailTo,
      replyTo: payload.email,
      subject: subjectParts.join(' · '),
      text: lines.join('\n'),
      html: `
        <strong>Nome:</strong> ${payload.name}<br/>
        <strong>Email:</strong> ${payload.email}<br/>
        ${payload.type ? `<strong>Tipo de evento:</strong> ${payload.type}<br/>` : ''}
        ${payload.date ? `<strong>Data:</strong> ${payload.date}<br/>` : ''}
        ${payload.location ? `<strong>Local do evento:</strong> ${payload.location}<br/>` : ''}
        ${payload.time ? `<strong>Horário do evento:</strong> ${payload.time}<br/>` : ''}
        ${payload.guests ? `<strong>Quantidade de convidados:</strong> ${payload.guests}<br/>` : ''}
        ${payload.planner ? `<strong>Assessoria:</strong> ${payload.planner}<br/>` : ''}
        ${payload.found ? `<strong>Como encontrou:</strong> ${payload.found}<br/>` : ''}
        <br/>
        <strong>Mensagem:</strong><br/>
        ${payload.message.replace(/\n/g, '<br/>')}
      `
    });

    return res.status(200).json({ success: true });
  } catch (error: any) {
    console.error('Contact form error:', error);
    return res.status(500).json({
      error: 'Email failed',
      message: 'Não foi possível enviar o email. Tente novamente mais tarde.'
    });
  }
}

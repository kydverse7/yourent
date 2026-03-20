import { Resend } from 'resend';
import twilio from 'twilio';
import { connectDB } from '@/lib/db';
import { Notification } from '@/models/Notification';

const resend = new Resend(process.env.RESEND_API_KEY);

const twilioClient =
  process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN
    ? twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
    : null;

// =============================================
// TEMPLATES EMAIL
// =============================================

function emailTemplate(title: string, content: string): string {
  return `
<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
  body { margin:0; background:#0A0A0A; font-family:Inter,sans-serif; color:#F5F0E8; }
  .wrap { max-width:600px; margin:0 auto; padding:40px 20px; }
  .logo { font-size:1.8rem; font-weight:900; color:#C9A84C; margin-bottom:32px; }
  .card { background:#111111; border:1px solid #2A2A2A; border-top:3px solid #C9A84C; border-radius:12px; padding:32px; }
  h1 { color:#F5F0E8; font-size:1.4rem; margin:0 0 16px; }
  p { color:#A89880; line-height:1.6; margin:8px 0; }
  .value { color:#C9A84C; font-weight:700; }
  .btn { display:inline-block; background:linear-gradient(135deg,#C9A84C,#9B7B2E); color:#000; font-weight:700; padding:14px 28px; border-radius:6px; text-decoration:none; margin-top:24px; }
  .footer { text-align:center; color:#3A3A3A; font-size:0.75rem; margin-top:32px; }
</style></head>
<body>
  <div class="wrap">
    <div class="logo">YOURENT</div>
    <div class="card">
      <h1>${title}</h1>
      ${content}
    </div>
    <div class="footer">© ${new Date().getFullYear()} Yourent — Location de voitures</div>
  </div>
</body>
</html>`;
}

// =============================================
// ENVOI EMAIL
// =============================================

interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
  reservationId?: string;
  locationId?: string;
}

async function sendEmail(opts: SendEmailOptions): Promise<string | null> {
  try {
    const { data, error } = await resend.emails.send({
      from: `Yourent <noreply@${process.env.NEXT_PUBLIC_APP_URL?.replace(/https?:\/\//, '') ?? 'yourent.ma'}>`,
      to: opts.to,
      subject: opts.subject,
      html: opts.html,
    });

    if (error) throw new Error(error.message);

    await connectDB();
    await Notification.create({
      canal: 'email',
      type: 'autre',
      sujet: opts.subject,
      corps: opts.subject,
      statut: 'envoyee',
      externalId: data?.id,
      recipientEmail: opts.to,
    });

    return data?.id ?? null;
  } catch (err) {
    console.error('[Email] Erreur envoi:', err);
    return null;
  }
}

// =============================================
// ENVOI SMS / WHATSAPP (Twilio)
// =============================================

async function sendSMS(to: string, body: string): Promise<boolean> {
  if (!twilioClient) {
    console.warn('[SMS] Client Twilio non configuré');
    return false;
  }
  try {
    const msg = await twilioClient.messages.create({
      body,
      from: process.env.TWILIO_PHONE_NUMBER!,
      to: to.startsWith('+') ? to : `+${to}`,
    });

    await connectDB();
    await Notification.create({
      canal: 'sms',
      type: 'autre',
      corps: body,
      statut: 'envoyee',
      externalId: msg.sid,
      recipientPhone: to,
    });

    return true;
  } catch (err) {
    console.error('[SMS] Erreur:', err);
    return false;
  }
}

async function sendWhatsApp(to: string, body: string): Promise<boolean> {
  if (!twilioClient) {
    console.warn('[WhatsApp] Client Twilio non configuré');
    return false;
  }
  try {
    const whatsappTo = `whatsapp:${to.startsWith('+') ? to : `+${to}`}`;
    const msg = await twilioClient.messages.create({
      body,
      from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER!}`,
      to: whatsappTo,
    });

    await connectDB();
    await Notification.create({
      canal: 'whatsapp',
      type: 'autre',
      corps: body,
      statut: 'envoyee',
      externalId: msg.sid,
      recipientPhone: to,
    });

    return true;
  } catch (err) {
    console.error('[WhatsApp] Erreur:', err);
    return false;
  }
}

// =============================================
// NOTIFICATIONS MÉTIER
// =============================================

interface ReservationNotifData {
  clientNom: string;
  clientEmail?: string;
  clientPhone?: string;
  vehicleLabel: string;
  debutAt: Date;
  finAt: Date;
  montantTotal?: number;
}

export async function sendConfirmationReservation(data: ReservationNotifData): Promise<void> {
  const debut = data.debutAt.toLocaleDateString('fr-MA');
  const fin = data.finAt.toLocaleDateString('fr-MA');

  // Email
  if (data.clientEmail) {
    await sendEmail({
      to: data.clientEmail,
      subject: `✅ Réservation confirmée — ${data.vehicleLabel}`,
      html: emailTemplate(
        'Votre réservation est confirmée !',
        `<p>Bonjour <span class="value">${data.clientNom}</span>,</p>
         <p>Votre réservation pour le <span class="value">${data.vehicleLabel}</span> est confirmée.</p>
         <p>📅 Du <span class="value">${debut}</span> au <span class="value">${fin}</span></p>
         ${data.montantTotal ? `<p>💰 Montant total : <span class="value">${data.montantTotal.toLocaleString()} MAD</span></p>` : ''}
         <p style="margin-top:16px;padding:12px;background:#1A1A1A;border-radius:8px;border-left:3px solid #C9A84C;font-size:0.85rem;">
           Le paiement se fait <strong>en agence lors de la remise des clés</strong>. Aucun paiement en ligne requis.
         </p>
         <p>Notre équipe vous contactera sous 30 min pour confirmer les détails.</p>`
      ),
    });
  }

  // WhatsApp
  if (data.clientPhone) {
    await sendWhatsApp(
      data.clientPhone,
      `✅ *Yourent* — Réservation confirmée !\n\n🚗 ${data.vehicleLabel}\n📅 Du ${debut} au ${fin}\n\nNous vous contacterons sous 30 min. Paiement en agence lors de la remise des clés.`
    );
  }
}

export async function sendRejectedReservation(data: ReservationNotifData & { motif?: string }): Promise<void> {
  if (data.clientEmail) {
    await sendEmail({
      to: data.clientEmail,
      subject: `❌ Réservation non disponible — ${data.vehicleLabel}`,
      html: emailTemplate(
        'Réservation non disponible',
        `<p>Bonjour <span class="value">${data.clientNom}</span>,</p>
         <p>Malheureusement, votre demande de réservation pour le <span class="value">${data.vehicleLabel}</span> n'a pas pu être acceptée.</p>
         ${data.motif ? `<p>Motif : ${data.motif}</p>` : ''}
         <p>N'hésitez pas à nous consulter pour trouver un autre véhicule disponible.</p>`
      ),
    });
  }
}

export async function sendRappelJMoins1(data: ReservationNotifData): Promise<void> {
  const debut = data.debutAt.toLocaleDateString('fr-MA');
  if (data.clientPhone) {
    await sendWhatsApp(
      data.clientPhone,
      `⏰ *Yourent* — Rappel : votre location commence demain !\n\n🚗 ${data.vehicleLabel}\n📅 ${debut}\n\nPensez à préparer vos documents (CIN/Passeport + Permis).`
    );
  }
}

export async function sendRetardAlert(clientPhone: string, vehicleLabel: string): Promise<void> {
  await sendSMS(
    clientPhone,
    `Yourent : La date de retour de votre ${vehicleLabel} est dépassée. Merci de nous contacter immédiatement au ${process.env.TWILIO_PHONE_NUMBER ?? ''}.`
  );
}

export const notificationService = {
  sendConfirmationReservation,
  sendRejectedReservation,
  sendRappelJMoins1,
  sendRetardAlert,
};

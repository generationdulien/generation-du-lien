import { Resend } from "resend";
import logger from "../config/logger.js";

const resend = new Resend(process.env.RESEND_API_KEY);

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";
const EMAIL_FROM = process.env.EMAIL_FROM || "onboarding@resend.dev";
const EMAIL_FROM_NAME = process.env.EMAIL_FROM_NAME || "Génération du Lien";

/**
 * HTML template for email verification
 */
function getVerificationEmailHTML(verificationUrl: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background: #f9fafb;
        }
        .header {
          text-align: center;
          padding: 30px 0;
          border-bottom: 1px solid #e5e7eb;
        }
        .logo {
          font-size: 24px;
          font-weight: 700;
          color: #1f2937;
          margin: 0;
        }
        .content {
          background: white;
          padding: 40px 30px;
          margin: 20px 0;
          border-radius: 8px;
          text-align: center;
        }
        .content h1 {
          color: #1f2937;
          font-size: 24px;
          margin: 0 0 20px 0;
        }
        .content p {
          color: #6b7280;
          margin: 15px 0;
          font-size: 16px;
        }
        .button {
          display: inline-block;
          padding: 12px 32px;
          margin: 30px 0;
          background: #3b82f6;
          color: white;
          text-decoration: none;
          border-radius: 6px;
          font-weight: 600;
          transition: background 0.3s ease;
        }
        .button:hover {
          background: #2563eb;
        }
        .link-fallback {
          color: #3b82f6;
          text-decoration: none;
          word-break: break-all;
          font-size: 14px;
        }
        .footer {
          text-align: center;
          color: #9ca3af;
          font-size: 14px;
          padding: 20px 0;
          border-top: 1px solid #e5e7eb;
        }
        .footer a {
          color: #3b82f6;
          text-decoration: none;
        }
        .divider {
          height: 1px;
          background: #e5e7eb;
          margin: 30px 0;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <p class="logo">Génération du Lien</p>
        </div>

        <div class="content">
          <h1>Bienvenue ! 👋</h1>
          <p>Merci de vous être inscrit sur Génération du Lien.</p>
          <p>Pour finaliser votre inscription, veuillez vérifier votre adresse email en cliquant sur le bouton ci-dessous :</p>

          <a href="${verificationUrl}" class="button">Vérifier mon email</a>

          <p style="color: #9ca3af; font-size: 14px; margin: 20px 0;">
            Ou utilisez ce lien :
          </p>
          <a href="${verificationUrl}" class="link-fallback">${verificationUrl}</a>

          <div class="divider"></div>

          <p style="color: #9ca3af; font-size: 13px;">
            Ce lien expire dans 24 heures.<br>
            Si vous n'avez pas créé de compte, vous pouvez ignorer cet email.
          </p>
        </div>

        <div class="footer">
          <p>Plateforme participative politique |
            <a href="${FRONTEND_URL}">Visiter le site</a>
          </p>
          <p style="margin: 10px 0 0 0; font-size: 12px;">
            © 2026 Génération du Lien. Tous droits réservés.
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}

/**
 * HTML template for welcome email
 */
function getWelcomeEmailHTML(firstName: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background: #f9fafb;
        }
        .header {
          text-align: center;
          padding: 30px 0;
          border-bottom: 1px solid #e5e7eb;
        }
        .logo {
          font-size: 24px;
          font-weight: 700;
          color: #1f2937;
          margin: 0;
        }
        .content {
          background: white;
          padding: 40px 30px;
          margin: 20px 0;
          border-radius: 8px;
        }
        .content h1 {
          color: #1f2937;
          font-size: 24px;
          margin: 0 0 20px 0;
        }
        .content p {
          color: #6b7280;
          margin: 15px 0;
          font-size: 16px;
        }
        .button {
          display: inline-block;
          padding: 12px 32px;
          margin: 30px 0;
          background: #3b82f6;
          color: white;
          text-decoration: none;
          border-radius: 6px;
          font-weight: 600;
          transition: background 0.3s ease;
        }
        .button:hover {
          background: #2563eb;
        }
        .footer {
          text-align: center;
          color: #9ca3af;
          font-size: 14px;
          padding: 20px 0;
          border-top: 1px solid #e5e7eb;
        }
        .footer a {
          color: #3b82f6;
          text-decoration: none;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <p class="logo">Génération du Lien</p>
        </div>

        <div class="content">
          <h1>Bienvenue, ${firstName} ! 🎉</h1>
          <p>Votre email a été vérifié avec succès.</p>
          <p>Vous pouvez maintenant accéder à la plateforme Génération du Lien et commencer à participer à notre démocratie participative.</p>

          <a href="${FRONTEND_URL}" class="button">Accéder à la plateforme</a>
        </div>

        <div class="footer">
          <p>Plateforme participative politique |
            <a href="${FRONTEND_URL}">Visiter le site</a>
          </p>
          <p style="margin: 10px 0 0 0; font-size: 12px;">
            © 2026 Génération du Lien. Tous droits réservés.
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export const emailService = {
  async sendVerificationEmail(email: string, token: string) {
    const verificationUrl = `${FRONTEND_URL}/auth/verify-email?token=${token}`;

    logger.info(`📧 Sending verification email to ${email}`);

    try {
      const result = await resend.emails.send({
        from: `${EMAIL_FROM_NAME} <${EMAIL_FROM}>`,
        to: email,
        subject: "Vérifiez votre email — Génération du Lien",
        html: getVerificationEmailHTML(verificationUrl),
      });

      logger.info(`✅ Verification email sent to ${email}`, { messageId: result.id });

      return {
        sent: true,
        messageId: result.id,
        message: `Verification email sent to ${email}`,
      };
    } catch (error) {
      logger.error(`❌ Failed to send verification email to ${email}`, {
        error: error instanceof Error ? error.message : String(error),
      });
      throw error;
    }
  },

  async sendWelcomeEmail(email: string, firstName: string) {
    logger.info(`📧 Sending welcome email to ${email}`);

    try {
      const result = await resend.emails.send({
        from: `${EMAIL_FROM_NAME} <${EMAIL_FROM}>`,
        to: email,
        subject: "Bienvenue sur Génération du Lien !",
        html: getWelcomeEmailHTML(firstName),
      });

      logger.info(`✅ Welcome email sent to ${email}`, { messageId: result.id });

      return {
        sent: true,
        messageId: result.id,
        message: `Welcome email sent to ${email}`,
      };
    } catch (error) {
      logger.error(`❌ Failed to send welcome email to ${email}`, {
        error: error instanceof Error ? error.message : String(error),
      });
      throw error;
    }
  },
};

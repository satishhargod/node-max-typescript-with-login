import sendGridMail from '@sendgrid/mail';
import { AppError, HttpCode } from '../../exceptions/AppError';
sendGridMail.setApiKey('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');

const MAIL_FROM = 'developer@esparkbizmail.com';
const SEND_GRID_ENABLED = true;

export const sendMail = async (
  to: string[],
  subject: string,
  templateName?: string,
  replacement?: object,
  attachments?: any,
  cc?: string[],
  bcc?: string[],
  content?: any,
  html?: any,
) => {
  try {
    const body = 'This is a test email using SendGrid from Node.js';
    const mailOptions = {
      from: MAIL_FROM,
      to,
      subject,
      cc,
      bcc,
      html: `<strong>${body}</strong>`,
      //attachments,
    };
    if (SEND_GRID_ENABLED) {
      try {
        await sendGridMail.send(mailOptions, true);
        console.log('Email sent');
      } catch (error) {
        console.log('Error :', error);
      }
    } else {
    }
  } catch (error) {
    throw new AppError({ httpCode: HttpCode.INTERNAL_SERVER_ERROR, description: 'Email error' });
  }
};

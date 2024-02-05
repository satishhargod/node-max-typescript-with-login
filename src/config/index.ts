import { config } from 'dotenv';
config();
// config({ path: `.env.${process.env.NODE_ENV || 'development'}` });
export const {
  //#BASIC
  NODE_ENV,
  PORT,
  LOG_FORMAT,
  BASE_URL,
  LOG_DIR,
  DATABASE_URL,
  SECRET_KEY,

  //#MAIL CONFIG
  MAIL_FROM,
  SEND_GRID_ENABLED,
  SEND_GRID_API_KEY,
  SEND_MAIL_HOST,
  SEND_MAIL_USER,
  SEND_MAIL_PASSWORD,

  //#NODE MAIL
  SMTP_MAIL_MAILER,
  SMTP_MAIL_HOST,
  SMTP_MAIL_USERNAME,
  SMTP_MAIL_PASSWORD,
  SMTP_MAIL_FROM_NAME,
  SMTP_MAIL_PORT,
  SMTP_MAIL_ENCRYPTION,
} = process.env;

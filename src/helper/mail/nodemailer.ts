import nodemailer from 'nodemailer';
import { Options } from 'nodemailer/lib/mailer';
import { SMTP_MAIL_HOST, SMTP_MAIL_PASSWORD, SMTP_MAIL_USERNAME } from '../../config';
export default class NodeMailerService {
  private transporter!: nodemailer.Transporter;

  readonly createConnection = async (options: {
    host?: string;
    port?: number;
    secure?: boolean;
    username?: string;
    password?: string;
  }) => {
    this.transporter = nodemailer.createTransport({
      host: options.host || SMTP_MAIL_HOST,
      port: options.port,
      secure: options.secure,
      auth: {
        user: options.username || SMTP_MAIL_USERNAME,
        pass: options.password || SMTP_MAIL_PASSWORD,
      },
    });
    return this;
  };

  async sendNodeMail(options: Options) {
    const details = await this.transporter
      .sendMail({
        from: options.from,
        to: options.to,
        cc: options.cc,
        bcc: options.bcc,
        subject: options?.subject,
        text: options?.text,
        html: options?.html,
        attachments: options.attachments,
      })
      .then((info) => {
        return info;
      })
      .catch((err) => {
        // throw new HttpException(400, err.message);
      });
    return details;
  }

  getTransporter() {
    return this.transporter;
  }
}

import nodemailer from 'nodemailer';

type SendMailOptions = {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
  text?: string;
};

function requiredEnv(name: string) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`${name} is required to send mail`);
  }

  return value;
}

export async function sendMail(options: SendMailOptions) {
  const port = Number(requiredEnv('SMTP_PORT'));

  const transporter = nodemailer.createTransport({
    host: requiredEnv('SMTP_HOST'),
    port,
    secure: port === 465,
    auth: {
      user: requiredEnv('SMTP_EMAIL'),
      pass: requiredEnv('SMTP_PASSWORD'),
    },
  });

  await transporter.sendMail({
    from: process.env.SMTP_FROM ?? process.env.SMTP_EMAIL,
    ...options,
  });
}

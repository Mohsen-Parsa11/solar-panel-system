import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';

import { sendMail } from '@/libs/Mail';
import { prisma } from '@/libs/Prisma';

export const auth = betterAuth({
  appName: 'Dawood Hewadwal Admin',
  database: prismaAdapter(prisma, {
    provider: 'mongodb',
  }),
  emailAndPassword: {
    enabled: true,
    disableSignUp: true,
    minPasswordLength: 8,
    resetPasswordTokenExpiresIn: 60 * 60,
    revokeSessionsOnPasswordReset: true,
    sendResetPassword: async ({ user, url }) => {
      await sendMail({
        to: user.email,
        subject: 'Reset your Dawood Hewadwal admin password',
        text: `Use this link to reset your password: ${url}`,
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827;">
            <h2>Password reset request</h2>
            <p>Hello ${user.name},</p>
            <p>Use the button below to reset your admin password. The link expires in one hour.</p>
            <p>
              <a href="${url}" style="display:inline-block;background:#075985;color:#ffffff;text-decoration:none;padding:12px 18px;border-radius:6px;">
                Reset password
              </a>
            </p>
            <p>If you did not request this, you can ignore this email.</p>
          </div>
        `,
      });
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
  },
  user: {
    additionalFields: {
      role: {
        type: 'string',
        required: true,
        defaultValue: 'admin',
        input: false,
      },
    },
  },
  trustedOrigins: [
    process.env.BETTER_AUTH_URL ?? 'http://localhost:3000',
  ],
});

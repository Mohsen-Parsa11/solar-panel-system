import { hashPassword } from 'better-auth/crypto';

import { prisma } from '../src/libs/Prisma';

function requiredEnv(name: string) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`${name} is required for prisma/seed.ts`);
  }

  return value;
}

async function main() {
  const email = requiredEnv('ADMIN_EMAIL').toLowerCase();
  const password = requiredEnv('ADMIN_PASSWORD');
  const name = process.env.ADMIN_NAME ?? 'Admin';
  const hashedPassword = await hashPassword(password);

  const admin = await prisma.user.upsert({
    where: { email },
    update: {
      name,
      role: 'admin',
      emailVerified: true,
    },
    create: {
      name,
      email,
      role: 'admin',
      emailVerified: true,
    },
  });

  await prisma.account.upsert({
    where: {
      providerId_accountId: {
        providerId: 'credential',
        accountId: admin.id,
      },
    },
    update: {
      password: hashedPassword,
    },
    create: {
      accountId: admin.id,
      providerId: 'credential',
      userId: admin.id,
      password: hashedPassword,
    },
  });

  console.warn(`Admin user ready: ${email}`);
}

main()
  .catch((error: unknown) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

import { PrismaClient } from '@prisma/client';



declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient();


if (process.env.NODE_ENV !== "production") globalThis.prisma = db;


// In dev mode we do this to work because in nextjs we have hot reload and it will initialize prisma client every time.
// If we are not in production we are going to store database value in globalThis.prisma










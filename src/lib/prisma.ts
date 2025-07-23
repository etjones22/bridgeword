import { PrismaClient } from '@prisma/client';

// Instantiate a single Prisma client for the entire application. During
// development hot reloads, the client may be recreated multiple times so we
// attach it to the global object to avoid exhausting database connections.
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

export default prisma;
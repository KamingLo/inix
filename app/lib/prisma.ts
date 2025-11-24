import { PrismaClient } from '@prisma/client';
import path from 'path';

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// Lokasi SQLite lokal
const filePath = path.join(process.cwd(), 'prisma/local.db');

const config = {
  datasources: {
    db: {
      url: 'file:' + filePath,
    },
  },
};

const prismaClient =
  global.prisma ??
  new PrismaClient(config);

// Cache prisma di global untuk development Hot Reload
if (process.env.NODE_ENV !== 'production') global.prisma = prismaClient;

export default prismaClient;

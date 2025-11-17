import { PrismaClient } from '@prisma/client';

// Mendeklarasikan variabel global untuk menyimpan instance Prisma
// Ini untuk mencegah pembuatan instance baru saat hot-reloading di development
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Cek jika instance 'prisma' sudah ada di global.
// Jika tidak ada, buat instance 'PrismaClient' baru.
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    // Opsional: Anda bisa menambahkan logging query di sini untuk debugging
    // log: ['query'],
  });

// Di lingkungan non-produksi (development),
// simpan instance prisma yang baru dibuat ke variabel global
// agar bisa digunakan kembali pada hot-reload berikutnya.
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

// Ekspor instance prisma sebagai default
export default prisma;
import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

let prismaInstance: PrismaClient;

try {
  prismaInstance = globalForPrisma.prisma ||
    new PrismaClient({
      log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
    });
} catch (error) {
  console.error("Failed to initialize Prisma Client:", error);
  throw error;
}

export const prisma = prismaInstance;

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

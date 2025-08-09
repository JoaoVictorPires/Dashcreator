import { prisma } from "./prisma";

/**
 * Verifica se um registro existe.
 */
export async function recordExists(table: string, id: number): Promise<boolean> {
  try {
    const record = await (prisma as any)[table].findUnique({ where: { id } });
    return !!record;
  } catch (error) {
    console.error("Erro ao verificar existência do registro:", error);
    return false;
  }
}
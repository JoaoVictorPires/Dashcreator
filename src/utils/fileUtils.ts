import fs from "fs/promises";
import path from "path";

export async function deleteFile(filePath: string): Promise<void> {
  try {
    await fs.access(filePath);
    await fs.unlink(filePath);
  } catch (error) {
    console.warn("Arquivo não encontrado ou erro ao deletar:", error);
  }
}

export function getUniqueFilename(originalName: string): string {
  const timestamp = Date.now();
  const ext = path.extname(originalName);
  const base = path.basename(originalName, ext);
  return `${base}-${timestamp}${ext}`;
}
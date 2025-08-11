import * as XLSX from "xlsx";
import { prisma } from "../utils/prisma";
import { logger } from "../utils/logger";
import fs from "fs";
import path from "path";

export async function processFile(filePath: string, fileName: string, id?: string) {
  try {
    const allowedDir = path.resolve("src/upload");
    const resolvedPath = path.resolve(filePath);
    if (!resolvedPath.startsWith(allowedDir)) {
      throw new Error("Caminho de arquivo inválido");
    }

    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

    if (id) {
      await prisma.uploadData.update({
        where: { id: parseInt(id) },
        data: {
          filename: fileName,
          data: JSON.stringify(data)
        }
      });
    } else {
      await prisma.uploadData.create({
        data: {
          filename: fileName,
          data: JSON.stringify(data)
        }
      });
    }

    fs.unlinkSync(filePath);
    logger.success(`Arquivo ${fileName} processado e salvo no banco.`);
  } catch (error) {
    logger.error("Erro ao processar arquivo:", error);
    throw error;
  }
}

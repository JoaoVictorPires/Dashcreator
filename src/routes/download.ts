import { Router } from "express";
import * as XLSX from "xlsx";
import { prisma } from "../utils/prisma";
import { parseJsonSafe } from "../utils/parseJsonSafe";
import { logger } from "../utils/logger";

const router = Router();

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const numericId = parseInt(id, 10);
    
    if (isNaN(numericId)) {
      return res.status(400).json({ error: "ID inválido" });
    }

    const uploadData = await prisma.uploadData.findUnique({
      where: { id: numericId }
    });

    if (!uploadData) {
      return res.status(404).json({ error: "Dados não encontrados" });
    }

    const parsedUploadData = parseJsonSafe(uploadData.data as string, []);
    const worksheet = XLSX.utils.json_to_sheet(parsedUploadData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Dados");

    const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });
    
    const sanitizedFilename = uploadData.filename.replace(/["\r\n]/g, '');
    res.setHeader("Content-Disposition", `attachment; filename="${sanitizedFilename}"`);
    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    res.send(buffer);
  } catch (error) {
    logger.error("Erro ao fazer download:", error);
    
    if (error instanceof Error) {
      if (error.message.includes('XLSX')) {
        return res.status(422).json({ error: "Erro ao processar arquivo Excel" });
      }
      if (error.message.includes('database') || error.message.includes('prisma')) {
        return res.status(503).json({ error: "Erro de conexão com banco de dados" });
      }
    }
    
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});
export default router;
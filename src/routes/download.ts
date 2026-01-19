import { Router } from "express";
import { prisma } from "../utils/prisma";
import { generateXlsx } from "../utils/generateXlsx";
import { parseJsonSafe } from "../utils/parseJsonSafe";
import { formatDate } from "../utils/formatDate";

const router = Router();


router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const uploadData = await prisma.uploadData.findUnique({
      where: { id: parseInt(id, 10) }
    });

    if (!uploadData) {
      return res.status(404).json({ error: "Dados não encontrados" });
    }

    const data = parseJsonSafe<any[]>(uploadData.data as string, []) || [];
    const buffer = generateXlsx({ data });

    res.setHeader("Content-Disposition", `attachment; filename="${uploadData.filename}"`);
    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    res.send(buffer);
  } catch (error) {
    console.error("Erro ao fazer download:", error);
    res.status(500).json({ error: "Erro ao fazer download" });
  }
});


router.get("/", async (req, res) => {
  try {
    const allUploads = await prisma.uploadData.findMany({
      orderBy: { createdAt: "desc" }
    });

    const allData = allUploads.flatMap(upload => {
      const parsedData = parseJsonSafe<any[]>(upload.data as string, []) || [];
      return parsedData.map(row => ({
        ...row,
        arquivo: upload.filename,
        criadoEm: formatDate(upload.createdAt)
      }));
    });

    const buffer = generateXlsx({ data: allData, sheetName: "Todos os Dados" });

    res.setHeader("Content-Disposition", 'attachment; filename="todos_os_dados.xlsx"');
    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    res.send(buffer);
  } catch (error) {
    console.error("Erro ao gerar XLSX:", error);
    res.status(500).json({ error: "Erro ao gerar XLSX" });
  }
});

export default router;

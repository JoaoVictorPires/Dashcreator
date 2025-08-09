import { Router, Response } from "express";
import { prisma } from "../utils/prisma";

const router = Router();

const handleError = (res: Response, error: unknown) => {
  console.error("Erro ao buscar dados:", error);
  res.status(500).json({ error: "Erro ao buscar dados" });
};

router.get("/", async (req, res) => {
  try {
    const allData = await prisma.uploadData.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    res.json(allData);
  } catch (error) {
    handleError(res, error);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const numericId = Number(id);
  
  if (isNaN(numericId)) {
    return res.status(400).json({ error: "ID inválido" });
  }
  
  try {
    const data = await prisma.uploadData.findUnique({
      where: {
        id: numericId,
      },
    });
    res.json(data);
  } catch (error) {
    handleError(res, error);
  }
});

export default router;

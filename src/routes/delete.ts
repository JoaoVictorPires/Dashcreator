import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { logger } from "../utils/logger";

const prisma = new PrismaClient();
const router = Router();


router.delete("/:id", async (req, res) =>{
    const { id } = req.params;
    try {
        const uploadData = await prisma.uploadData.findUnique({
            where: { id: parseInt(id, 10) }
        });

        if (!uploadData) {
            return res.status(404).json({ error: "Dados não encontrados" });
        }

        await prisma.uploadData.delete({
            where: { id: uploadData.id }
        });

        res.status(204).send();
    } catch (error) {
        logger.error("Erro ao deletar:", error);
        res.status(500).json({ error: "Erro ao deletar" });
    }
});

export default router;

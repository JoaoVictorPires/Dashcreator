import { Router } from "express";
import multer from "multer";
import { processFile } from "../services/fileProcessor";
import { logger } from "../utils/logger";

const upload = multer({ 
  dest: "src/upload/",
  limits: { fileSize: 8 * 1024 * 1024 } // 8MB limit
});
const router = Router();

router.post("/", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Nenhum arquivo enviado" });
    }
    await processFile(req.file.path, req.file.originalname);
    res.json({ message: "Arquivo processado com sucesso" });
  } catch (error) {
    logger.error("Erro ao processar upload:", error);
    res.status(500).json({ error: "Erro ao processar o arquivo" });
  }
});
router.post("/:id", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Nenhum arquivo enviado" });
    }
    await processFile(req.file.path, req.file.originalname, req.params.id);
    res.json({ message: "Arquivo atualizado com sucesso" });
  } catch (error) {
    logger.error("Erro ao atualizar upload:", error);
    res.status(500).json({ error: "Erro ao atualizar o arquivo" });
  }
});

export default router;
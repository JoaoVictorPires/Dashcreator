import express from "express";
import dotenv from "dotenv";
import uploadRouter from "./routes/upload";
import dataRouter from "./routes/data";
import downloadRouter from "./routes/download";
import { logger } from "./utils/logger";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/upload", uploadRouter);
app.use("/data", dataRouter);
app.use("/download", downloadRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Servidor rodando na porta ${PORT}`);
});

import path from "path";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import uploadRouter from "./routes/upload";
import dataRouter from "./routes/data";
import downloadRouter from "./routes/download";
import deleteRouter from "./routes/delete";
import { logger } from "./utils/logger";

dotenv.config();

const app = express();
app.use(express.json());
<<<<<<< HEAD
app.use(express.static(path.join(__dirname, "..", "public")));
=======
// Enable CORS so the frontend (vite/dev server) can call this API
app.use(cors());
>>>>>>> e9905d3784fa26b2d306a89fc0efce4e4efc8628

app.use("/upload", uploadRouter);
app.use("/data", dataRouter);
app.use("/download", downloadRouter);
app.use("/delete", deleteRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Servidor rodando na porta ${PORT}`);
});

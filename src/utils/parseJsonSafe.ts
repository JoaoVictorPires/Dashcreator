import { logger } from "./logger";

export function parseJsonSafe<T>(str: string, fallback: T): T {
  try {
    return JSON.parse(str) as T;
  } catch (error) {
    logger.warn("Erro ao fazer parse do JSON:", error);
    return fallback;
  }
}

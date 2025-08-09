/**
 * Converte string JSON em objeto com tratamento de erro.
 */
export function safeJsonParse<T>(data: string): T | null {
  try {
    return JSON.parse(data);
  } catch (error) {
    console.warn("Erro ao fazer parse do JSON:", error);
    return null;
  }
}

/**
 * Remove espaços extras de uma string.
 */
export function cleanString(value: string): string {
  return value.trim().replace(/\s+/g, " ");
}
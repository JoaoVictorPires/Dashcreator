/**
 * Converte um número de série do Excel para Date.
 * @param serial Número de dias desde 1900.
 */
export function excelSerialToDate(serial: number): Date {
  const excelEpoch = new Date(1899, 11, 30);
  return new Date(excelEpoch.getTime() + serial * 86400000);
}

/**
 * Formata uma data para o padrão brasileiro.
 */
export function formatDateBR(date: Date): string {
  return date.toLocaleDateString("pt-BR");
}
import * as XLSX from "xlsx";

interface GenerateXlsxOptions {
  data: any[];
  sheetName?: string;
}

export function generateXlsx({ data, sheetName = "Dados" }: GenerateXlsxOptions): Buffer {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
  return XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
}

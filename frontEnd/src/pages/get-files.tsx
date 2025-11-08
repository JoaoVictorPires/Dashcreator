import API_BASE_URL from "../api/api";
import axios from "axios";

export const fetchFiles = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/data`);
    console.log("Arquivos recebidos:", response.data);
    // Backend returns an array of records; ensure we return an array to the caller
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error("Erro ao buscar arquivos:", error);
    // Re-throw so callers can react, or return empty array as fallback
    // throw error;
    return [];
  }
};
export const fetchFileById = async (id: number) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/data/${id}`);
    console.log("Arquivo recebido:", response.data);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar arquivo:", error);
    throw error;
  }
};

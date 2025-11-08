import API_BASE_URL from "../api/api";

export async function fetchFiles() {
  const response = await fetch(`${API_BASE_URL}/files`);
  if (!response.ok) throw new Error("Failed to fetch files");
  return response.json();
}

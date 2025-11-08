// hooks/useUpload.ts
import { useMutation } from "@tanstack/react-query";
import { API_BASE_URL } from "../api/api";

export function useUpload() {
  return useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch(`${API_BASE_URL}/upload`, {
        method: "POST",
        body: formData,
      });
      return res.json();
    },
  });
}

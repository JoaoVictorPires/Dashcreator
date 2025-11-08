// pages/UploadPage.tsx
import { useUpload } from "../hooks/useUpload";

export default function UploadPage() {
  const { mutate, isPending, isSuccess, isError } = useUpload();

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) mutate(file);
  }

  return (
    <div className="upload-container">
      <h1>Upload de Arquivo</h1>
      <input type="file" accept=".xlsx,.csv" onChange={handleFileChange} />
      {isPending && <p>Enviando...</p>}
      {isSuccess && <p>Upload concluído!</p>}
      {isError && <p>Erro ao enviar o arquivo.</p>}
    </div>
  );
}

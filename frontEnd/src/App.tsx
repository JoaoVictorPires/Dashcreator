import { useState, useEffect } from 'react';
import { fetchFileById, fetchFiles } from './pages/get-files';

export default function App() {
  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getFiles = async () => {
    setLoading(true);
    setError(null);
    try {
      const files = await fetchFiles();
      setFiles(files);
    } catch (err: any) {
      console.error('Erro ao buscar arquivos:', err);
      setError(err?.message || 'Erro ao buscar arquivos');
      setFiles([]);
    } finally {
      setLoading(false);
    }
  };
  const getUniqueFile = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const file = await fetchFileById(id);
      console.log('Arquivo recebido:', file);
    } catch (error: any) {
      console.error('Erro ao buscar arquivo:', error);
      setError(error?.message || String(error) || 'Erro ao buscar arquivo');
    } finally {
      setLoading(false);
    }
  };

  // Load files on mount
  useEffect(() => {
    getFiles();
  }, []);

  return (
    <>
      <header>Oroch</header>
      <main>
        <h1>Welcome to Dashcreator</h1>
        <p>Your dashboard creator platform</p>

        <div>
          <button onClick={getFiles} disabled={loading}>
            {loading ? 'Carregando...' : 'Atualizar arquivos'}
          </button>
          <input type="text" />
          <button onClick={() => getUniqueFile(1)} disabled={loading}>
            Buscar arquivo
          </button>
        </div>

        {error && <p style={{ color: 'red' }}>Erro: {error}</p>}

        {files.length > 0 ? (
          <ul>
            {files.map((file) => (
              <li key={file.id}>{file.filename ?? file.originalName ?? file.name}</li>
            ))}
          </ul>
        ) : (
          <p>{loading ? 'Carregando...' : 'Nenhum arquivo encontrado'}</p>
        )}
      </main>
      <footer>Footer content</footer>
    </>
  );
}

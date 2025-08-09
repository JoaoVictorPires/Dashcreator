# Dashcreator

API para upload, processamento e download de arquivos Excel/CSV com armazenamento em banco PostgreSQL.

## Funcionalidades

- Upload de arquivos Excel (.xlsx) e CSV
- Processamento automático e armazenamento em banco de dados
- API REST para consulta de dados
- Download de arquivos processados
- Validação e tratamento de erros
- Logging estruturado

## Tecnologias

- **Node.js** + **TypeScript**
- **Express.js** - Framework web
- **Prisma** - ORM para banco de dados
- **PostgreSQL** - Banco de dados
- **Multer** - Upload de arquivos
- **XLSX** - Processamento de planilhas
- **Docker** - Containerização do banco

## Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd Dashcreator
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

4. Inicie o banco PostgreSQL:
```bash
docker-compose up -d
```

5. Execute as migrações:
```bash
npx prisma migrate dev
```

## Uso

### Desenvolvimento
```bash
npm run dev
```

### Produção
```bash
npm run build
npm start
```

## API Endpoints

### Upload
- `POST /upload` - Upload de novo arquivo
- `POST /upload/:id` - Atualizar arquivo existente

### Dados
- `GET /data` - Listar todos os dados
- `GET /data/:id` - Buscar dados por ID

### Download
- `GET /download/:id` - Download do arquivo processado

## Estrutura do Projeto

```
src/
├── config/         # Configurações
├── controllers/    # Controladores
├── routes/         # Rotas da API
├── services/       # Lógica de negócio
├── utils/          # Utilitários
├── upload/         # Arquivos temporários
└── uploads/        # Arquivos processados
```

## Banco de Dados

O projeto utiliza PostgreSQL com Prisma ORM. O modelo principal:

```prisma
model UploadData {
  id        Int      @id @default(autoincrement())
  filename  String
  data      Json
  createdAt DateTime @default(now())
}
```

## Configuração

Variáveis de ambiente necessárias:
- `DATABASE_URL` - URL de conexão PostgreSQL
- `PORT` - Porta do servidor (padrão: 3000)

## Limitações

- Tamanho máximo de arquivo: 8MB
- Formatos suportados: .xlsx, .csv
- Primeira planilha é processada automaticamente

## Scripts

- `npm run dev` - Desenvolvimento com hot reload
- `npm run build` - Build para produção
- `npm start` - Iniciar aplicação
- `npm run prisma` - Comandos do Prisma
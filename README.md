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

3. **Configure o Docker para PostgreSQL:**

Crie o arquivo `docker-compose.yml` na raiz do projeto:

```yaml
services:
  db:
    image: postgres:15
    restart: always
    environment:
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: root123
      POSTGRES_DB: dashdb
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:
```

**Parametrização do Docker:**
- `POSTGRES_USER`: usuário do banco (padrão: `admin`)
- `POSTGRES_PASSWORD`: senha do banco (padrão: `root123`)
- `POSTGRES_DB`: nome do banco de dados (padrão: `dashdb`)
- `ports`: mapeamento de portas `"HOST:CONTAINER"` (padrão: `5432:5432`)
- `volumes`: persistência dos dados em volume Docker nomeado `pgdata`

4. **Configure as variáveis de ambiente:**

Crie o arquivo `.env` na raiz do projeto:

```env
DATABASE_URL="postgresql://admin:root123@localhost:5432/dashdb"
PORT=3000
```

⚠️ **Importante**: Se você alterar `POSTGRES_USER`, `POSTGRES_PASSWORD` ou `POSTGRES_DB` no `docker-compose.yml`, ajuste também a `DATABASE_URL` no `.env` seguindo o padrão:

```
postgresql://[USUARIO]:[SENHA]@localhost:5432/[BANCO]
```

5. **Inicie o banco PostgreSQL:**
```bash
docker-compose up -d
```

Para verificar se o container está rodando:
```bash
docker-compose ps
```

Para ver os logs:
```bash
docker-compose logs -f db
```

6. **Execute as migrações do Prisma:**
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

## Comandos Docker Úteis

```bash
# Iniciar o banco de dados
docker-compose up -d

# Parar o banco de dados
docker-compose down

# Parar e remover volumes (⚠️ apaga os dados)
docker-compose down -v

# Ver logs em tempo real
docker-compose logs -f db

# Verificar status do container
docker-compose ps

# Reiniciar o container
docker-compose restart db
```
# Desafio NodeJs - Primeira API

Este projeto é uma API REST desenvolvida com [Fastify](https://www.fastify.io/) e [Drizzle ORM](https://orm.drizzle.team/) para gerenciar cursos e usuários, utilizando PostgreSQL como banco de dados. A API inclui sistema completo de autenticação e autorização baseado em JWT.

## Funcionalidades

### Autenticação e Autorização

- **Login**: Autenticação de usuários com email e senha
- **JWT**: Sistema de tokens para autenticação
- **Controle de acesso**: Diferentes níveis de permissão (student/manager)

### Gestão de Cursos

- **Criar curso**: Adiciona um novo curso ao banco de dados (apenas managers)
- **Listar cursos**: Retorna todos os cursos cadastrados com filtros
- **Buscar curso por ID**: Retorna os detalhes de um curso específico
- **Matrículas**: Sistema de inscrição de estudantes em cursos

### Documentação e Testes

- **Documentação automática**: Disponível em `/docs` durante o desenvolvimento
- **Testes automatizados**: Cobertura de testes com Vitest
- **Seed de dados**: População automática do banco com dados de exemplo

## Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **Fastify** - Framework web rápido e eficiente
- **Drizzle ORM** - ORM type-safe para TypeScript
- **PostgreSQL** - Banco de dados relacional
- **Zod** - Validação de dados e schemas
- **JWT** - Autenticação baseada em tokens
- **Argon2** - Hash de senhas seguro
- **Swagger e Scalar API Reference** - Documentação interativa
- **Vitest** - Framework de testes
- **Docker** - Containerização do banco de dados
- **TypeScript** - Tipagem estática

## Como executar

### 1. Clonar o repositório

```bash
git clone https://github.com/IsaqueTADS/desafio-primeira-api-nodejs.git
cd  desafio-primeira-api-nodejs
```

### 2. Instalar dependências

```bash
npm install
```

### 3. Configurar o banco de dados

Utilize o Docker para subir o banco PostgreSQL:

```bash
docker-compose up -d
```

### 4. Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
NODE_ENV=development
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/desafio"
JWT_SECRET="seu-jwt-secret-super-seguro-aqui"
```

**Importante**:

- Substitua `seu-jwt-secret-super-seguro-aqui` por uma string segura e única
- Para produção, use uma string aleatória longa e complexa
- Nunca commite o arquivo `.env` no repositório

### 5. Gerar e rodar as migrações

```bash
npm run db:generate
npm run db:migrate
```

### 6. Popular o banco com dados de exemplo (opcional)

```bash
npm run db:seed
```

### 7. Iniciar o servidor

```bash
npm run dev
```

A API estará disponível em `http://localhost:3333`.

## Rotas da API

### Autenticação

- `POST /sessions` - Login de usuário (retorna JWT token)

### Cursos

- `POST /courses` - Cria um novo curso (requer autenticação de manager)
- `GET /courses` - Lista todos os cursos (com filtros opcionais)
- `GET /courses/:id` - Busca curso por ID (requer autenticação)

### Parâmetros de Query

- `GET /courses?orderBy=title` - Ordena cursos por título
- `GET /courses?page=1&limit=10` - Paginação de resultados

### Headers de Autenticação

Para rotas protegidas, inclua o header:

```
Authorization: <seu-jwt-token>
```

## Testando a API

### Testes Automatizados

Execute os testes com:

```bash
npm test
```

Para executar com cobertura de código:

```bash
npm run test:coverage
```

### Testes Manuais

Você pode utilizar o arquivo `request.http` para testar as rotas diretamente no VS Code ou usar ferramentas como [Insomnia](https://insomnia.rest/) ou [Postman](https://www.postman.com/).

### Scripts Disponíveis

- `npm run dev` - Inicia o servidor em modo desenvolvimento
- `npm run db:generate` - Gera migrações do banco de dados
- `npm run db:migrate` - Executa migrações no banco
- `npm run db:seed` - Popula o banco com dados de exemplo
- `npm run db:studio` - Abre o Drizzle Studio para visualizar dados
- `npm test` - Executa os testes

## Docker e Deployment

### Banco de Dados com Docker

O projeto inclui configuração Docker para o PostgreSQL:

```bash
# Subir apenas o banco de dados
docker-compose up -d

# Parar o banco
docker-compose down
```

### Containerização da Aplicação

O projeto inclui um `Dockerfile` para containerização:

```bash
# Build da imagem
docker build -t desafio-api .

# Executar container
docker run -p 3333:3333 --env-file .env desafio-api
```

### Variáveis de Ambiente para Produção

Para produção, configure as seguintes variáveis:

```env
NODE_ENV=production
DATABASE_URL="postgresql://user:password@host:port/database"
JWT_SECRET="jwt-secret-super-seguro-para-producao"
```

## Documentação

Durante o desenvolvimento, acesse a documentação interativa em:

```
http://localhost:3333/docs
```

## Estrutura do Projeto

```
├── docker-compose.yml          # Configuração do PostgreSQL
├── Dockerfile                  # Containerização da aplicação
├── drizzle.config.ts          # Configuração do Drizzle ORM
├── package.json               # Dependências e scripts
├── request.http               # Exemplos de requisições
├── tsconfig.json              # Configuração TypeScript
├── vitest.config.ts           # Configuração dos testes
├── drizzle/                   # Migrações do banco de dados
│   ├── meta/                  # Metadados das migrações
│   └── *.sql                  # Arquivos de migração
├── src/
│   ├── @types/                # Definições de tipos
│   │   └── fastify.d.ts
│   ├── database/              # Configuração do banco
│   │   ├── client.ts          # Cliente do banco
│   │   ├── schema.ts          # Schemas das tabelas
│   │   └── seed.ts            # Dados de exemplo
│   ├── routes/                # Rotas da API
│   │   ├── hooks/             # Middlewares de autenticação
│   │   │   ├── check-request-jwt.ts
│   │   │   └── check-user-role.ts
│   │   ├── create-course.ts   # Criação de cursos
│   │   ├── get-courses.ts     # Listagem de cursos
│   │   ├── get-coursers-by-id.ts # Busca por ID
│   │   └── login.ts           # Autenticação
│   ├── tests/                 # Testes automatizados
│   │   └── factories/         # Factories para testes
│   ├── utils/                 # Utilitários
│   │   └── get-authenticated-user-from-request.ts
│   ├── app.ts                 # Configuração do Fastify
│   └── server.ts              # Inicialização do servidor
└── coverage/                  # Relatórios de cobertura de testes
```

## Modelo de Dados

### Tabelas

- **users**: Usuários do sistema

  - `id` (UUID, PK)
  - `name` (texto)
  - `email` (texto, único)
  - `password` (hash Argon2)
  - `role` (enum: student/manager)

- **courses**: Cursos disponíveis

  - `id` (UUID, PK)
  - `title` (texto, único)
  - `description` (texto, opcional)

- **enrollments**: Matrículas de estudantes
  - `id` (UUID, PK)
  - `userId` (UUID, FK para users)
  - `courseId` (UUID, FK para courses)
  - `createdAt` (timestamp)

### Relacionamentos

- Um usuário pode ter múltiplas matrículas
- Um curso pode ter múltiplos estudantes matriculados
- Relacionamento many-to-many entre users e courses através de enrollments

## Licença

Este projeto está sob licença ISC.

# Desafio NodeJs - Primeira API

Este projeto é uma API REST desenvolvida com [Fastify](https://www.fastify.io/) e [Drizzle ORM](https://orm.drizzle.team/) para gerenciar cursos e usuários, utilizando PostgreSQL como banco de dados.

## Funcionalidades

- **Criar curso**: Adiciona um novo curso ao banco de dados.
- **Listar cursos**: Retorna todos os cursos cadastrados.
- **Buscar curso por ID**: Retorna os detalhes de um curso específico.
- **Documentação automática**: Disponível em `/docs` durante o desenvolvimento.

## Tecnologias Utilizadas

- Node.js
- Fastify
- Drizzle ORM
- PostgreSQL
- Zod (validação de dados)
- Swagger e Scalar API Reference (documentação)
- Docker (para banco de dados)

## Como executar

### 1. Clonar o repositório

```bash
git clone <url-do-repositorio>
cd node-primeira-api/aulas
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

Edite o arquivo `.env` conforme necessário:

```
NODE_ENV=development
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/desafio"
```

### 5. Gerar e rodar as migrações

```bash
npm run db:generate
npm run db:migrate
```

### 6. Iniciar o servidor

```bash
npm run dev
```

A API estará disponível em `http://localhost:3333`.

## Rotas principais

- `POST /courses` - Cria um novo curso
- `GET /courses` - Lista todos os cursos
- `GET /courses/:id` - Busca curso por ID

## Testando a API

Você pode utilizar o arquivo `request.http` para testar as rotas diretamente no VS Code ou usar ferramentas como [Insomnia](https://insomnia.rest/) ou [Postman](https://www.postman.com/).

## Documentação

Durante o desenvolvimento, acesse a documentação interativa em:

```
http://localhost:3333/docs
```

## Estrutura do Projeto

```
├── docker-compose.yml
├── drizzle.config.ts
├── package.json
├── request.http
├── server.ts
├── tsconfig.json
├── drizzle/
│   └── ...migrações e snapshots
├── src/
│   ├── database/
│   │   ├── client.ts
│   │   └── schema.ts
│   └── routes/
│       ├── create-course.ts
│       ├── get-courses.ts
│       └── get-cousers-by-id.ts
```

## Licença

Este projeto está sob licença ISC.

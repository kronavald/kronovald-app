# 🚀 Kronovald Backend

This application implements the **REST API** for the Kronovald frontend.

## 🛠️ Tech Stack

- **Framework:** `Nest.js` - [Docs](https://docs.nestjs.com) | [CLI](https://docs.nestjs.com/cli/overview)
- **Database:** `PostgreSQL 17`
- **ORM:** `Prisma` - [Docs](https://www.prisma.io/docs/orm/prisma-client) | [CLI](https://www.prisma.io/docs/orm/tools/prisma-cli)

## 🏗️ Architecture

The application follows a modular architecture based on **CRUD resources** with `REST` controllers.
Each resource typically consists of three main files: `service`, `controller`, and `module`, which are exported together.

The **service layer** interacts with the database using `PrismaClient`, as described in the official documentation: [Using Prisma Client in NestJS](https://docs.nestjs.com/recipes/prisma#use-prisma-client-in-your-nestjs-services).

## ⚙️ Setting Up the Development Environment

### 📦 Install Dependencies

Navigate to the `server-app/` directory and install the necessary dependencies:

```bash
cd server-app
npm install
```

### 🛠️ Install CLI Tools

The project utilizes both **Nest.js CLI** and **Prisma CLI** for development tasks. Install them globally and check their usage:

```bash
npm install -g @nestjs/cli prisma

nest --help
prisma --help
```

### 🗄️ Database Configuration

Define the [PostgreSQL connection string](https://www.connectionstrings.com/postgresql/) in the `.env` file located in `server-app/`. Example:

```ini
# server-app/.env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/MYDATABASE?schema=public"
```

### 🔄 Apply Database Migrations

Run the following command to apply database migrations via Prisma CLI:

```bash
prisma migrate dev
```

### 🚀 Start the Server

Run the development server using:

```bash
npm run start:dev
```

The backend will be available at: `http://localhost:3000`

To verify that the API is working, open your browser and visit `http://localhost:3000`. If you see the JSON response:

```json
{"data":"Hello World!"}
```

## 📜 License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for more details.

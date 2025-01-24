# Server application of the Kronovald project

This application implements the REST API for the Kronovald website.

## Project stack

- Framework `Nest.js` - [documentation](https://docs.nestjs.com) | [CLI](https://docs.nestjs.com/cli/overview)
- Database `PostgreSQL 17`
- ORM `Prisma` - [documentation](https://www.prisma.io/docs/orm/prisma-client) | [CLI](https://www.prisma.io/docs/orm/tools/prisma-cli)

## Architecture

The application consists of `CRUD` resources with `REST` controllers.

Usually this is a pack of three files: `service`, `controller` and `module` that exports them.

The service works with the database through `PrismaClient` as shown in this section of the documentation: [use-prisma-client-in-your-nestjs-services](https://docs.nestjs.com/recipes/prisma#use-prisma-client-in-your-nestjs-services).

## Initializing the working environment


### Dependencies

The application root is located in the `server-app/` directory. Go to this directory and run the following command in a terminal to install the project dependencies:

```console
npm install
```

### Command-line interfaces

The work uses CLI of PrismaORM and CLI of Nest.js framework.

Let's install the CLI of the Nest.js framework and call up help on its use. Run the following commands in a terminal:

```console
npm install -global nest

nest --help
```

Let's install the CLI of the PrismaORM and call up help on its use. Run the following commands in a terminal:

```console
npm install -global prisma

prisma --help
```

### Connect Database

Next, write the [connection string](https://www.connectionstrings.com/postgresql/) to the existing database in the `server-app/.env` file. Example:

```env
# file server-app/.env

DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/MYDATABASE?schema=public"
```

### Actualize database

Perform [migrations via Prisma CLI](https://www.prisma.io/docs/orm/reference/prisma-cli-reference#migrate-dev)

```console
prisma migrate dev
```

### Start server

Start the http server provided by Nest.js using the following command in the terminal:

```console
npm run start:dev
```

Now call the API index endpoint by going to the `http://localhost:3000` page in your browser. If the json object `{"data":"Hello World!"}` is returned to you, then congratulations, you have successfully initialized the working environment and launched the dev server! 🥳 🎉

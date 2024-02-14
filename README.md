# express-jwt-postgres

Express JS JWT Postgres with Prisma ORM

https://github.com/dividedbynil/ko-architecture/tree/master  
https://dev.to/mihaiandrei97/jwt-authentication-using-prisma-and-express-37nk  
https://jwt-keys.21no.de/

Prisma migrate CLI commands:

```bash
$ npx prisma migrate dev --name init
```

Prisma reset DB CLI commands:

```bash
$ npx prisma db push --force-reset
```

Sequelize CLI:

```bash
$ npx sequelize-cli init
```

Create a new migration:

```bash
$ npx sequelize-cli migration:create --name create_users
```

Running Migrations:

```bash
$ npx sequelize-cli db:migrate
```

Running Seeds:

```bash
$ npx sequelize-cli db:seed:all
```

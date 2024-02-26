# express-jwt-postgres

Express JS JWT Postgres with [Sequelize ORM](https://sequelize.org/docs/v6/getting-started/)

## How to Run

```bash
# redis available
$ redis-cli

# clone the repo
$ git clone repo

# go into repo's directory
$ cd repo

# copy and edit env file
$ cp .env.example .env

# migrate database
$ npx sequelize db:migrate

# seeds data to database such as admin user, status, roles
$ npx sequelize db:seed:all

# start app
$ npm run dev
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

### Todo List

- [x] Favicon using serve-favicon
- [x] Morgan Log file
- [x] Express Architecture Pattern
  - [x] Routes (bridge - logic process)
  - [x] Services (controller)
  - [x] Sequelize ORM (process to DB)
  - [x] Error Handling
  - [x] Validator using express-validator
- [x] DB
  - [x] Make migration files using sequelize6-auto-migrations
  - [x] DB migrate using sequelize db:migrate
- [ ] Auth
  - [x] Register
  - [ ] Send Email with background task and Redis
  - [ ] Open Link Verification Email
  - [ ] Resend Verification Email Code
  - [x] Login
  - [x] JWT Auth Middleware
  - [x] Refresh Token
  - [ ] Forgot Password, send email OTP
  - [ ] Forgot Password Verify OTP
  - [ ] Reset Password
  - [ ] Logout
- [ ] Account
  - [x] Get Profile
  - [ ] Update Profile
  - [ ] Update Photo Profile + thumbnail
  - [ ] Upload File, upload image(compressed)
  - [ ] Change Password
  - [ ] Deletion Account with OTP
  - [ ] Recover deleted account (Admin role)
  - [ ] User Activity with interval (last login at, ip address in middleware)
- [ ] Golang Swagger
- [ ] CRUD
  - [x] Pagination with Sequelize [Limits and Pagination](https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#limits-and-pagination)
  - [x] Sort + Search function in List Data
  - [ ] Create Data
  - [ ] Edit Data
  - [ ] Delete Data
- [x] Associations Sequelize Model
- [ ] Struct MarshalJSON (Custom representation)
- [ ] Open API with API KEY middleware
- [ ] Upload Files
- [ ] Remove Files
- [ ] Upload Videos
- [ ] Create thumbnail from videos with ffmpeg
- [ ] Upload Images and Compress Image with libvips
- [ ] Create thumbnail from image
- [ ] Image Processing with [libvips](https://www.libvips.org/)

### Credits
https://github.com/dividedbynil/ko-architecture/tree/master  
https://dev.to/mihaiandrei97/jwt-authentication-using-prisma-and-express-37nk  
https://jwt-keys.21no.de/
https://www.npmjs.com/package/sequelize6-auto-migrations


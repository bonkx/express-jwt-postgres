#!/bin/sh
# cp .env ./prisma/.env
npx prisma migrate dev
npx prisma db seed
npm run start
flush:
	npx prisma db push --force-reset

migrate:
	npx prisma migrate dev

seed:
	npx prisma db seed

build:
	npm run build

run:
	npm run dev

lint:
	npm run eslint

fix:
	npm run eslint-fix
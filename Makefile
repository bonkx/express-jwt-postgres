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
	npm run lint

clean:
	rm -rf package-lock.json 
	rm -rf node_modules/

builserver:
	docker-compose down
	docker-compose build

runserver:
	docker-compose up --remove-orphans
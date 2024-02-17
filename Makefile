flush:
	npx prisma db push --force-reset

migration:
	npx makemigration --name $(name)

migrate:
	npx sequelize db:migrate

seed:
	npx sequelize db:seed:all

build:
	npm run build

run:
	npm run dev

clean:
	rm -rf package-lock.json 
	rm -rf node_modules/

builserver:
	docker-compose down
	docker-compose build

runserver:
	docker-compose up --remove-orphans
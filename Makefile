flush:
	npx prisma db push --force-reset

migration:
	npx makemigration --name $(name)

migrate:
	npx sequelize db:migrate

seed:
	npx sequelize db:seed:all

build:
	docker-compose down
	docker-compose build

run:
	docker-compose up --remove-orphans

clean:
	rm -rf package-lock.json 
	rm -rf node_modules/

builserver:
	docker-compose down
	docker-compose build

runserver:
	docker-compose up -d --remove-orphans
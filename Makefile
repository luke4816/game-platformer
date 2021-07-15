build:
	docker build -t registry.gitlab.com/luke4816/game-platformer .

push: build
	docker push registry.gitlab.com/luke4816/game-platformer:latest

deploy:
	docker-compose up -d

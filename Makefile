build:
	docker build -t ghcr.io/luke4816/game-platformer:latest .

push: build
	docker push ghcr.io/luke4816/game-platformer:latest

pull:
	docker pull ghcr.io/luke4816/game-platformer:latest

deploy-dev:
	docker-compose up -d

deploy-prod:
	docker stack deploy -c docker-compose.yaml game-platformer

remove-dev:
	docker-compose down

remove-prod:
	docker stack rm game-platformer

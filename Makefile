db:
	sudo docker compose run db bash -c "psql -h workflowdb -d postgres -U postgres"

up:
	sudo docker compose up

upd:
	sudo docker compose up -d

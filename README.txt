SQL command in Docker: 
    - Access to sqlcmd: docker exec -it k-project-sql /opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P 'P0ssibl3#2023'
	-S: server
	-U: user
	-P: Password
    - List all name of databases: Select name from sys.databases

=========================================================================================
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

Docker command:
    - Docker login with user name: docker login -u "user-name"
    - Pull Image from Repository: docker pull "user-name"/"repository-name"
    - Run Docker from image: docker run -d -p "port:port" --name "container-name" --restart always "docker-name/repository:tagname"

    - Run Watchtower: docker run -d --name "watchtower-name" --restart always -v /var/run/docker.sock:/var/run/docker.sock containrrr/watchtower "project-a project-b" --interval "seconds" --cleanup
	- Ex: docker run -d --name watchtower --restart always -v /var/run/docker.sock:/var/run/docker.sock containrrr/watchtower "k-project-fe k-project-be" --interval 300 --cleanup
	- Ex: docker run -d --name watchtower -v /var/run/docker.sock:/var/run/docker.sock -e WATCHTOWER_POLL_INTERVAL=300 -e WATCHTOWER_CLEANUP=true containrrr/watchtower login-fe login-be admin-fe

    - Run SQL Image: sudo docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=P0ssibl3#2023" -p 1433:1433 --name k-project-sql --hostname kprojectsql -d mcr.microsoft.com/mssql/server:2019-latest
	-u: username
	-d: detach mode(background run)
	-p: port (docker-port/application-port)
	--name: container name (can change)
	--restart: restart type
	--interval: time to check (second)
	--hostname: host (can change)

=========================================================================================
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

Git command:
    - Add file: git add .
    - Commit: git commit -m "Message when commit code"
    - Push: git push
    - Pull: git pull

=========================================================================================
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

Visual Studio Command:
    - Build image: docker build -t username/repositoryname . (huynhkhang/loginproject) 
    - Push code to docker hub: docker push username/repositoryname (huynhkhang/loginproject) 

Visual Code Command:
    - Push code to docker hub: npm run push-docker



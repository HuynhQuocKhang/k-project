SQL command in Docker: 
    - Access to sqlcmd: docker exec -it k-project-sql /opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P 'P0ssibl3#2023'
    - List all name of databases: Select name from sys.databases
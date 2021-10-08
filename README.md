1. Clone repo ```git clone git@github.com:agentsmity/hometasks.git ~/hometasks```
2. How to launch:
    - If you want to use docker - launch container ```cd ~/hometasks && docker-compose up -d``` and go into container ```docker exec -it hw_node```
    - Or you can start expamples from folder hometasks/node 
3. Run commands ```npm i && npm run migrate && npm run seed && npm run start```
4. Allowed urls:
    - GET /api/v1/users
    - GET /api/v1/users?withDeleted=1&limit=1&offset=1
    - GET /api/v1/users/:id
    - POST /api/v1/users
    - PATCH /api/v1/users/:id
    - DELETE /api/v1/users/:id
    - GET /api/v1/suggest?part=namePart&limit=5

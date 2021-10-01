1. Clone repo ```git clone git@github.com:agentsmity/hometasks.git ~/hometasks```
2. How to launch:
    - If you want to use docker - launch container ```cd ~/hometasks && docker-compose up -d``` and go into container ```docker exec -it hw_node```
    - Or you can start expamples from folder hometasks/node 
3. Run commands ```npm i && npx tsc && npm run start```
4. Allowed urls:
    - GET /api/v1/users
    - GET /api/v1/users?withDeleted=1
    - GET /api/v1/users/user/:id
    - POST /api/v1/users/user
    - PATCH /api/v1/users/user/:id
    - DELETE /api/v1/users/user/:id
    - GET /api/v1/suggest?part=namePart&limit=5
6. Examples:
  - GET ALL USERS:
    > ```> curl -X GET 127.0.0.1/api/v1/users```
    >> ```{"result":[],"errors":false}```
  - CREATE USER WITH ERROR:
    > ```> curl -X POST -H "Content-Type: application/json" -d '{"login":"us","password": "ffgg64", "age":"35"}' http://127.0.0.1/api/v1/users/user```
    >> ```{"result":false,"errors":[{"login":"must NOT have fewer than 3 characters"},{"age":"must be number"}]}```
  - CREATE USER:
    > ```>  curl -X POST -H "Content-Type: application/json" -d '{"login":"firstUser","password": "ffgg64", "age":35}' http://127.0.0.1/api/v1/users/user```
    >> ```{"result":{"id":1,"isDeleted":false,"login":"firstUser","password":"ffgg64","age":35},"errors":false}```
  - CREATE SAME USER:
    > ```> curl -X POST -H "Content-Type: application/json" -d '{"login":"firstUser","password": "ffgg64", "age":35}' http://127.0.0.1/api/v1/users/user```
    >> ```{"result":false,"errors":["User with this login already exists."]}```
  - CREATE USER:
    > ```>  curl -X POST -H "Content-Type: application/json" -d '{"login":"secondUser","password": "ffgg64", "age":35}' http://127.0.0.1/api/v1/users/user```
    >> ```{"result":{"id":2,"isDeleted":false,"login":"secondUser","password":"ffgg64","age":35},"errors":false}```
  - GET ALL USERS:
    > ```> curl -X GET 127.0.0.1/api/v1/users```
    >> ```{"result":[{"id":1,"isDeleted":false,"login":"firstUser","password":"ffgg64","age":35},{"id":2,"isDeleted":false,"login":"secondUser","password":"ffgg64","age":35}],"errors":false}```
  - WRONG USER EDIT:
    > ```curl -X PATCH -H "Content-Type: application/json" -d '{"loginnnn":"sec_user", "age": "dfdf"}' localhost/api/v1/users/user/2```
    >> ```{"result":false,"errors":[{"loginnnn":"must NOT have additional properties"},{"age":"must be number"}]}```
  - DELETE USER:
    > ```curl -X DELETE localhost/api/v1/users/user/2```
    >> ```{"result":{"id":2,"isDeleted":true,"login":"secondUser","password":"ffgg64","age":35},"errors":false}```

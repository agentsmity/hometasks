1. Clone repo ```git clone git@github.com:agentsmity/hometasks.git ~/hometasks```
2. How to launch:
    - If you want to use docker - launch container ```cd ~/hometasks && docker-compose up -d``` and go into container ```docker exec -it hw_node```
    - Or you can start expamples from folder hometasks/node 
5. Run command ```npm i```
6. You can start hometasks:
    - ```npm run task1``` - reverse string from stdin
    - ```npm run task2 [file|pipeline]``` - read csv file and write output

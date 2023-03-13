# dnd-app

# backend setup instructions
## create a environment files ".env" in the backend directory
### add the following to the file
MONGO_URI : <your mongo uri>
DOCKER_MONGO_URI : <your docker mongo uri>
JWT_SECRET : <your jwt secret>
PORT : <your port>
JWT_EXPIRES_IN : <your jwt expires in>
JWT_COOKIE_EXPIRES_IN : <your jwt cookie expires in>

# Docker setup instructions for development

## Install Nodejs, Docker and Docker Compose
docker-compose up --build -d
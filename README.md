# dnd-app

## backend setup instructions
### create a environment files ".env" in the backend directory
#### add the following to the file
##### MONGO_URI (mongodb connection string)
##### JWT_SECRET
##### JWT_EXPIRES_IN (in hours) default 24h
##### JWT_COOKIE_EXPIRES_IN (in days) default 90 
##### PORT (default 8000)
##### NODE_ENV (development or production)

# Docker setup instructions for development

## Install Nodejs, Docker and Docker Compose
docker-compose up --build -d
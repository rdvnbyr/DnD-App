FROM node

WORKDIR /app

ARG DEFAULT_PORT=3000

COPY package.json /app

RUN yarn

COPY . /app

EXPOSE $DEFAULT_PORT

CMD ["yarn", "dev"]

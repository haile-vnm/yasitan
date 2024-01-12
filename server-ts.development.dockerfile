FROM node:18-alpine
LABEL name=um/server version=1.0.0

RUN yarn global add nodemon typescript

WORKDIR /app

COPY ./package.json ./yarn.lock ./

RUN yarn

EXPOSE 3000

CMD [ "yarn", "dev" ]

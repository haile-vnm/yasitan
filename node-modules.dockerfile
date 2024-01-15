FROM node:18-alpine
LABEL name=um/server version=1.0.0

RUN npm install -g pnpm

WORKDIR /app

COPY ./package.json ./pnpm-lock.yaml ./

CMD [ "pnpm", "install" ]

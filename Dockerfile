FROM node:18-alpine
LABEL name=ysvc version=1.0.0

RUN npm install -g pnpm nx

WORKDIR /app

COPY ./package.json ./pnpm-lock.yaml ./
RUN pnpm i

CMD [ "nx", "--version" ]

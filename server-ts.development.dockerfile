FROM node:18-alpine
LABEL name=um/server version=1.0.0

RUN yarn global add nx

WORKDIR /app

EXPOSE 3000

CMD ["pnpm", "serve"]

FROM node:15.10.0-alpine3.13

LABEL version="1.0"
LABEL description="This is the base docker image for backend API."
LABEL maintainer = ["carllosshennriique@gmail.com"]

RUN apk add --no-cache --upgrade bash

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

EXPOSE 3003

RUN mkdir -p /app/node_modules && chown -R node:node /app
WORKDIR /app

USER node
COPY package.json package-lock.json ./
COPY --chown=node:node . .
RUN npm install

CMD ["node", "build/index.js"]
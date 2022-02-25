FROM node:12-slim

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn

COPY . /usr/src/app


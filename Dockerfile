FROM node:14.16.1-alpine

WORKDIR /usr/undefined/app

COPY package*.json ./

RUN npm install --silent

COPY . .

EXPOSE 3010
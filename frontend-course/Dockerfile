FROM node:8.11.4-alpine

RUN mkdir -p /frontend
WORKDIR /frontend

COPY . .

RUN yarn install

EXPOSE 3000

CMD yarn start

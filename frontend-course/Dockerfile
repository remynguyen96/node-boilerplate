FROM node:10

RUN mkdir -p /frontend
WORKDIR /frontend

COPY . .

RUN yarn install

EXPOSE 3000

CMD yarn start

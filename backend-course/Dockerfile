FROM node:10

RUN mkdir -p /backend
WORKDIR /backend

COPY . .

RUN yarn install

EXPOSE 4500

CMD yarn start


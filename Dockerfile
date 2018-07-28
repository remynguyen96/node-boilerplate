FROM node:latest

WORKDIR /usr/src/app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 4500

CMD ls -al

CMD pwd

CMD ["node", "src/app.js"]


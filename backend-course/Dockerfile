FROM node:8.11.4

LABEL version="1.0.0" maintainer="Remy Nguyen <remynguyen96@gmail.com>"

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4500

CMD ["npm", "start"]


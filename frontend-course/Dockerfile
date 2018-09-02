FROM node:8.11.4

LABEL version="1.0.0" maintainer="Remy Nguyen <remynguyen96@gmail.com>"

RUN mkdir -p /usr/src/frontend

WORKDIR /usr/src/frontend

COPY package*.json .

RUN npm install

COPY . .

ENV PORT=3000

EXPOSE 3000

CMD ["npm", "start"]
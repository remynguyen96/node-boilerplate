FROM node:8.11.4-alpine

LABEL version="1.0.0" maintainer="Remy Nguyen <remynguyen96@gmail.com>"

RUN apk --update --no-cache add tzdata bash curl \
    && cp /usr/share/zoneinfo/Asia/Ho_Chi_Minh /etc/localtime \
    && echo "Asia/Ho_Chi_Minh" > /etc/timezone \
    && apk del tzdata

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 4500

CMD ["npm", "start", "mysql_docker"]
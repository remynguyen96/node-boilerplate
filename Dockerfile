FROM node:8.9.1
MAINTAINER RemyNguyen <nguyentietngocchau@gmail.com>
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN npm install
COPY . .

EXPOSE 4500
CMD ["npm", "dev"]

#Bundle app source
VOLUME /usr/src/app



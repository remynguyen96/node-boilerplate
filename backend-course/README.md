# node-boilerplate made by Remy Nguyen
<p align="center"><img src="https://www.eddisrupt.com/img/nodejs.png" width="100" /></p>

# nodejs-boilerplate with Mysql

## Overview

* **Easiest way to run a node server:** Sensible defaults & includes everything you need with minimal setup.
* **Compatible:** Works with all clients (React, Vue, Angular4...) and fits seamless in your SPA workflow.

`nodejs-boilerplate` is based on the following libraries & tools:

* [`express`](https://github.com/expressjs/express)/[`mysql`](http://docs.sequelizejs.com): Performant, extensible web server framework

## Features

* Docker setup
* File upload
* MySQL database
* ES6 typings
* Extensible via Express middlewares
* Accepts `application/json` content-types
* Runs everywhere: Can be deployed via `now`, `up`, AWS Lambda, Heroku etc.
* Supports middleware out of the box.


## Getting Started
***
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

- Install **Node LTS 8** 
  - Download: https://nodejs.org/en/download/


### Installation

  Install yarn as global packages if not ``` npm install -g yarn```
```
    yarn install
```
*You can use npm. But I recommend usage yarn instend of npm*

### Usage
***

#### Running application default NODE_ENV=development 

```
  yarn start
```

Server will start with port http://localhost:4500

> By default application will run on port 4500. If you want to specify port, ex: **3005** , on Windows or Linux, Mac you modify on folder **src/config** part of **.env** file as
 below:
>  - **Current**: ``` WEB_PORT=4500 ```  
>  - **Change to**: ``` WEB_PORT=3005, ```

#### Running seeder create fake data for application

```
  yarn seed
```

#### Running application with environment configure 

```
  yarn dev || yarn production
```

Server will start with port http://localhost:4500 and environment NODE_ENV is development with **yarn dev** or production with **yarn production**

> By default application will run with environment **development**. If you want to specify environment, ex: **testEnvironment**. You modify on folder **scripts** part of **package.json** file as below:
>  - **Current**: ``` "dev": "cross-env NODE_ENV=development nodemon --exec babel-node src/index.js", ```  
>
>  - **Change to**: ``` "dev": "cross-env NODE_ENV=testEnvironment nodemon --exec babel-node src/index.js", ```

 
    
#### Running the tests

### `up` (Coming soon 🔜 )

#### Scan ESlint issues

```
  yarn run lint
```

### Build default NODE_ENV=production

```
  yarn run build
```


## Usage

### API
* Config local or server development such as port, mail server and database, etc.
```js

.env.examble

#MySQL
MYSQL_VERSION=8.0.12
MYSQL_HOST=mysql_app
MYSQL_USERNAME=root
MYSQL_DATABASE=node-course
MYSQL_ROOT_PASSWORD=secret

# Phpmyadmin
PHPMYADMIN_NAME=phpmyadmin

# Nodejs
WEB_PORT=4500
NODE_NAME=node
JWT_SECRET=jwt-secret
PASSPORTCODE=Auth
EXP_TOKEN_ACCESS=1h

# MailServer
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=examble
MAIL_PASSWORD=examble

```
## Create container Nodejs with Dockerfile
1.  Download and install the [Docker](https://docs.docker.com/install/)
2.  You can config version nodeJs in **Dockerfile**. *( By default backend server require nodeJS version >= 8 )*
3.  To create images in docker for node backend `docker build -t node-application .` with name images is **node-application**. *( You can run `docker images` to check it was created )*
4.  Config host in file mysql to connect backend server with mysql database in path `node-boilerplate/backend-course/src/config/mysql.js` with host name container 
mysql. 
5.  To create container for docker `docker run --name backend-node -p 4500:4500 -d node-application` *( Run `docker ps` to check containers )*.
6.  Going to `http://localhost:4500/api/buildinfo` without run yarn start or anything about NodeJS

## Create MySQL database and phpMyAdmin with Docker Compose

1.  Download and install the [DockerCompose](https://docs.docker.com/compose/install/)
2.  Edit variable password with **MYSQL_ROOT_PASSWORD** and name database with **MYSQL_DATABASE** in file **.env**
3.  Create images node server with cmd `docker-compose build`.
4.  Run docker to create database with cmd `docker-compose up -d`.
5.  Going to phpMyadmin and manager mysql with localhost [127.0.0.1:8888](http://127.0.0.1:8888/)
6.  Login phpMyadmin with username is `root` and password is `secret`

## Deployment

### Heroku

To deploy your application server with [Heroku](https://heroku.com), follow these instructions:

1.  Download and install the [Heroku Command Line Interface](https://devcenter.heroku.com/articles/heroku-cli#download-and-install) (previously Heroku Toolbelt)
2.  Log in to the Heroku CLI with `heroku login`
3.  Navigate to the root directory of your `app` server
4.  Create the Heroku instance by executing `heroku create`
5.  Deploy your app server by executing `git push heroku master`

### `up` (Coming soon 🔜 )

### AWS Lambda (Coming soon 🔜 )

## Help & Community

Join me. if you run into issues or have questions. I love talking to you!

<p align="center"><a href="https://oss.prisma.io"><img src="https://imgur.com/IMU2ERq.png" alt="Prisma" height="170px"></a></p>

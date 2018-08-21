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

> By default application will run on port 4500. If you want to specify port, ex: **3005** , on Windows or Linux, Mac you modify on folder **src/config** part of **constants.js** file as below:
>  - **Current**: ``` PORT: process.env.PORT || 4500 ```  
>  - **Change to**: ``` PORT: process.env.PORT || 3005, ```

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
// Path: node-boilerplate\backend-course\src\config\constants.js
const defaultConfig = {
  PORT: process.env.PORT || 4500,
  MAIL_HOST: 'smtp.mailtrap.io',
  MAIL_PORT: '25',
  MAIL_USERNAME: 'examble',
  MAIL_PASSWORD: 'password',
};

const config = {
  development: {
    MYSQL_DB: 'node-course',
    MYSQL_USERNAME: 'root',
    MYSQL_PASSWORD: 'secret',
  },
  production: {},
};

```

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

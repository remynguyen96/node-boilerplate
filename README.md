# node-boilerplate made by Remy Nguyen
<p align="center"><img src="https://www.eddisrupt.com/img/nodejs.png" width="250" /></p>

# nodejs-boilerplate with mongodb

## Overview

* **Easiest way to run a node server:** Sensible defaults & includes everything you need with minimal setup.
* **Compatible:** Works with all clients (React, Vue, Angular4...) and fits seamless in your SPA workflow.

`nodejs-boilerplate` is based on the following libraries & tools:

* [`express`](https://github.com/expressjs/express)/[`mongoose`](http://mongoosejs.com): Performant, extensible web server framework

## Features

* Docker setup
* File upload
* MongoDB database
* ES6 typings
* Extensible via Express middlewares
* Accepts `application/json` content-types
* Runs everywhere: Can be deployed via `now`, `up`, AWS Lambda, Heroku etc.
* Supports middleware out of the box.

## Install

## Usage

### API

```js
const options = {
 development: {
     MONGO_URL: 'mongodb://localhost:27017/mongodb_name',
     JWT_SECRET: 'examble',
     MAIL_HOST: 'smtp.mailtrap.io',
     MAIL_PORT: '25',
     MAIL_USERNAME: 'examble',
     MAIL_PASSWORD: 'password',
   },
   production: {}
}

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

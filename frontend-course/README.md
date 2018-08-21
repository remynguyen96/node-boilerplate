# ReactJS-boilerplate made by Remy Nguyen
<p align="center"><img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K" width="100" /></p>

# ReactJS-boilerplate 
## Overview

* **Easiest way to run a reactjs:** Sensible defaults & includes everything you need with minimal setup.
* **Compatible:** Works with all api servers (NodeJS, Java, PHP...) and fits seamless in your server workflow.

`ReactJS-boilerplate` is based on the following libraries & tools:

* [`create-react-app`](https://reactjs.org/)/[`Ant-Design`](https://ant.design/components/menu/): Performant, extensible web frontend framework

## Features

* Ant Design Component
* ES6 typings
* Redux
* Redux Thunk
* Accepts `application/json` content-types
* Runs everywhere: Can be deployed via `now`, `up`, AWS Lambda, Heroku, Firebase, Digitalocean etc.


## Getting Started
***
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

- Install **Node LTS 8** 
  - Download: https://nodejs.org/en/download/


### Installation

  Install yarn as global packages if not ``` npm install -g yarn ```
```
    yarn install
```
*You can use npm. But I recommend usage yarn instend of npm*

### Usage
***

#### Running application

```
  yarn start
```

Server will start with port http://localhost:3000

> By default application will run on port 4500. If you want to specify port, ex: **3005** , on Windows you modify **scripts** part of **package.json** file as below:
>  - **Current**: ``` "start": "node scripts/start.js" ```  
>  - **Change to**: ``` "start": "set PORT=3005 && node scripts/start.js" ```


#### Running the tests

```
  yarn test
```

### Build

```
  yarn build
```


## Usage

### API
* Config connect *API* server. Default application will connect with server through port **4500**
```js
// Path: node-boilerplate\frontend-course\src\redux\service.js
export const URL_SERVER = 'http://localhost:4500';
```
*You can change port server above to connect your server*

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

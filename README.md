# Front-End with Vuejs & Quasar Components (app)

A Quasar Framework app.

## Prerequisites
Before we set up the app, let’s check whether Quasar CLI is globally installed on your computer. Using the terminal run:

```bash
quasar -v
```

If you get a command not found error, run the following command to install it:

```bash
yarn global add @quasar/cli

OR

npm install -g @quasar/cli
```


## Setup Instructions
In your folder workspace
### 1. git clone [https://github.com/EspiraMarvin/vue-mongo]('https://github.com/EspiraMarvin/vue-mongo')

### 2. Navigate to your repo folder
```bash
cd vue-mongo
```

## Install the dependencies
```bash
yarn install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
yarn dev
```

### Visit the URL [localhost:8080](http://localhost:8080)

## To run tests

### Jest Unit Tests (for vuex store)
```bash
yarn run test:unit:ci

OR

yarn run test:unit
```

### To run Cypress E2E Tests
```bash
yarn yarn run test:e2e:ci

OR

yarn run test:e2e
```

### Build the app for production
```bash
yarn build
```

# Back-End with Expressjs & MongoDB Mongoose (api)

An Express Framework api

### Navigate to the server folder

```bash
cd vue-mongo

cd server
```
## Install the dependencies

```bash
cd server
```

### Then install dependencies

```bash
yarn install
```

### Add .env file in the `server` folder

```bash
server/.env
```

### Add the `MONGO_URI` variable I have provider in the `.env` file like below:

```bash
MONGO_URI = "the mongo uri"
```

### Start the api server in development mode
```bash
yarn server
```

### Visit the URL [localhost:4000](http://localhost:4000)


### To view the API Documentation visit this link [Protranslatin API Docs](http://localhost:4000/api-docs/)

```bash

http://localhost:4000/api-docs/
```


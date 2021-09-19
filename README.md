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

### 2. In the folder you clone, open your editor of choice and

## Install the dependencies
```bash
yarn
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

### Customize the configuration
See [Configuring quasar.conf.js](https://v1.quasar.dev/quasar-cli/quasar-conf-js).

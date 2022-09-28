const express = require('express')
const app = express()
const mongoose = require('mongoose')
const { PORT, mongoUri } = require('./config')
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')

const clientRoutes = require('./routes/api/client')
const providerRoutes = require('./routes/api/provider')

const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

// Extended: https://swagger.io/specification/#inforObject
const swaggerOptions = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: 'Protranslating API',
      version: "1.0.0",
      description: "A simple Clients & Providers Express Library API"
    },
    // host: 'localhost:4000', // the host or url of the app
    // basePath: '/api', // the basepath of your endpoint
    servers: [
      {
        url: "http://localhost:4000"
      }
    ]
  },
  apis: ["routes/api/*.js"]
}

const specs = swaggerJSDoc(swaggerOptions)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))
app.use(cors())
app.use(morgan('tiny'))
app.use(bodyParser.json())

mongoose.connect(mongoUri,  {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB database connected...')
}).catch(err => console.log(err))

app.use('/api/client', clientRoutes)
app.use('/api/provider', providerRoutes)

app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`)).sockets

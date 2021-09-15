const express = require('express')
const app = express()
const mongoose = require('mongoose')
const { PORT, mongoUri } = require('./config')
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const clientRoutes = require('./routes/api/client')
const providerRoutes = require('./routes/api/provider')

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

app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`))

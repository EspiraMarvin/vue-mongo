const { Schema, model } =require('mongoose')

const ClientSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      unique: true,
      required: true
    },
    phone: {
      type: Number,
      required: true
    },
    providers:[],
    date: {
      type: Date,
      default: Date.now
    }
  }
)

const Client = model('client', ClientSchema)

module.exports = Client

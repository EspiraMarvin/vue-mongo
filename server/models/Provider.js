const { Schema, model } =require('mongoose')

const ProviderSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    }
  }
)

const Provider = model('provider', ProviderSchema)

module.exports = Provider

const mongoose = require('mongoose')

const Schema = mongoose.Schema

const urlSchema = new Schema({
  hash: String,
  shortUrl: String
})

module.exports = mongoose.model('Url', urlSchema)

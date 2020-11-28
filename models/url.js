const mongoose = require('mongoose')

const Schema = mongoose.Schema

const urlSchema = new Schema({
  originUrl: String,
  shortUrlHash: String
})

module.exports = mongoose.model('Url', urlSchema)

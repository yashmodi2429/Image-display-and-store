const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const baseString = new Schema({
  url: {
    type: Buffer,
    contentType: String,
    required: true
  }
});

module.exports = mongoose.model('BaseString', baseString);

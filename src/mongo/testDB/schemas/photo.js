const {Schema} = require('mongoose')

module.exports = new Schema({name: {type: String, required: true}}, {_id: false})

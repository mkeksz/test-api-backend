const {Schema} = require('mongoose')

module.exports = new Schema(
    {no: {type: String, required: true}},
    {_id: false}
)

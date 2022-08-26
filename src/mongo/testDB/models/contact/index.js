const {Schema} = require('mongoose')

module.exports = new Schema(
    {
        firstname: {type: String, trim: true, required: true},
        lastname: {type: String, trim: true, required: true},
        patronymic: {type: String, trim: true, required: true},
        phone: {type: String, trim: true, required: true},
        email: {type: String, trim: true, required: true}
    },
    {timestamps: true}
)

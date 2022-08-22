const {Schema, Types} = require('mongoose')
const Contract = require('../../schemas/contract')
const Photo = require('../../schemas/photo')

module.exports = new Schema(
    {
        name: {type: String, trim: true, required: true},
        shortName: {type: String, trim: true, required: true},
        businessEntity: {type: String, required: true, enum: ['Corporation', 'LLC', 'Partnership']},
        address: {type: String, trim: true, required: true},
        contract: Contract,
        type: [String],
        status: {type: String, default: 'active'},
        contact: [Types.ObjectId],
        photos: [Photo]
    },
    {timestamps: true}
)

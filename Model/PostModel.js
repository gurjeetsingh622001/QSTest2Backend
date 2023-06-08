const mongo = require('mongoose')

const postSchema = mongo.Schema({
    'title': { type: String, default: '' },
    'description': { type: String, default: '' },
    'image': { type: String, default: '' },
    'price': { type: Number, default: '' },
    'userId': { type: mongo.Schema.Types.ObjectId, ref: 'user', default: '' },
})

module.exports = mongo.model('post', postSchema)
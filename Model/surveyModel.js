const mongo = require('mongoose')

const surveySchema = mongo.Schema({
    'occupation': { type: String, default: '' },
    'income': { type: String, default: '' },
    'education': { type: String, default: '' },
    'email': { type: String, default: '' },
    'userId': { type: mongo.Schema.Types.ObjectId, ref: 'user' }
})

module.exports = mongo.model('survey', surveySchema)
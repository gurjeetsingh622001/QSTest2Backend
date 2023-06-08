const mongo = require("mongoose");

const userSchema = mongo.Schema({
    'name': { type: String, default: '' },
    'email': { type: String, default: '' },
    'phone': { type: Number, default: '' },
    'dob': { type: String, default: '' },
    'address':
    {
        'state': { type: String },
        'country': { type: String }
    }
    ,
    'role': { type: String, default: 'user' },
    'password': { type: String, default: '' },
    'is_blocked': { type: Boolean, default: false },
    'created_at': { type: Date, default: Date.now() },
});

module.exports = mongo.model('user', userSchema);
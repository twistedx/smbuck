const mongoose = require('mongoose');

const EntrySchema = mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String
    },
    team: {
        type: String
    },
    hasPaid: {
        type: Boolean,
        default: false
    },
    contestRef: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model('entry', EntrySchema)
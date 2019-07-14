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
    team: {
        type: String,
        required: true
    },
    hasPaid: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model('entry', EntrySchema)
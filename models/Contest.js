const mongoose = require('mongoose');

const ContestSchema = mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    contestants: {
        type: Array,
        ref: 'contestants'
    },
    description: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now()
    },
    entryFee: {
        type: Number
    },
    location: {
        type: String
    },
    rules: {
        type: String
    },
    contestType: {
        type: String
    },
    username: {
        type: String
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }

})

module.exports = mongoose.model('contest', ContestSchema)
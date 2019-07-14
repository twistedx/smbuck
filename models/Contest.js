const mongoose = require('mongoose');

const ContestSchema = mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    contestants: {
        type: Array,
        ref: 'user'
    },
    description: {
        type: String
    },
    date: {
        type: Date,
        default: Date.getYear()
    }

})

module.exports = mongoose.model('contest', ContestSchema)
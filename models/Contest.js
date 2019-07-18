const mongoose = require('mongoose');

const ContestSchema = mongoose.Schema({

    name: {
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
    type: {
        type: String
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }

})

module.exports = mongoose.model('contest', ContestSchema)
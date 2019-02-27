const mongoose = require('mongoose')
const Schema = mongoose.Schema

const pollResultSchema = new Schema({
    answer_id: {
        ref: 'poll_answers',
        type: Schema.Types.ObjectId
    },
    user_name: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('poll_votes', pollResultSchema)

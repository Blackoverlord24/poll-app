const mongoose = require('mongoose')
const Schema = mongoose.Schema

const pollAnswerSchema = new Schema({
    poll_id: {
        ref: 'polls',
        type: Schema.Types.ObjectId
    },
    answer: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('poll_answers', pollAnswerSchema)

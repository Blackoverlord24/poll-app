const mongoose = require('mongoose')
const Schema = mongoose.Schema

const pollSchema = new Schema({
    name: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model('polls', pollSchema)

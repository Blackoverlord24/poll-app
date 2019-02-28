const express = require('express')
const bodyParser = require('body-parser');
const pollRoutes = require('./routes/poll');
const pollVoteRoutes = require('./routes/pollVote');
require('./config/db')

const app = express()

//express settings
app.use(bodyParser.json())
app.use(require('cors')())
app.use(express.static(__dirname+'/client'));

//express settings
app.use('/', pollRoutes)
app.use('/poll', pollRoutes)
app.use('/poll-vote', pollVoteRoutes)

module.exports = app

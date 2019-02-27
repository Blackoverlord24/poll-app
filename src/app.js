const express = require('express')
const bodyParser = require('body-parser');
const pollRoutes = require('./routes/poll');
require('./config/db')

const app = express()

app.use(bodyParser.json())
app.use(require('cors')())
app.use(express.static(__dirname+'/client'));

app.use('/poll', pollRoutes)

module.exports = app

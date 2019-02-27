const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/poll')
  .then( () => console.log('MongoDB connected'))
  .catch(e => console.log(e))

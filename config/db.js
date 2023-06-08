const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/qservices_test2')
  .then(() => console.log('Connected!'));
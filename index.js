const express = require('express')
const app = express()
const port = 5000
const cors = require('cors')
const userRoutes = require('./routing/userRoutes')
const seeder = require('./config/seeder')
const db = require('./config/db')

app.use(cors())
seeder.insertadmin()

//middlewares
app.use(express.urlencoded({ extended: true }))
app.use(express.json({ limit: '50mb' }))



app.use('/user', userRoutes)

app.get('/admin', function (req, res) {
    console.log('hello api works')
})
app.listen(port, function () {
    console.log('port 5000')
})
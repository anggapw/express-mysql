const express = require('express');
const bodyParser = require('body-parser')
const connection = require('./config/database')

const userRouter = require('./routes/route')
const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// connection database - mysql
connection.connect(err => {
    if(err) {
        console.log('error connecting')
    }
    console.log('connected')
})


app.get('/', (req, res) => {
    res.send('welcome')
})
app.use('/', userRouter)

app.listen(4000, () => {
    console.log('server berjalan.....')
})
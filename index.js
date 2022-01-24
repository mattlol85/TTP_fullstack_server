const express = require('express')
const app = express()
const {database} = require('./database/index')
const cors = require('cors')
const useApi = require('./API')
//use morgan to log HTTP requests aand error
const morgan = require('morgan')
const PORT = 3000 

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/api', useApi)

database.sync().then(() => {
    console.log('database synced')
    app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
})

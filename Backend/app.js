const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const app = express()
const cors = require('cors')
const cookieParser = require('cookie-parser')
const userRoutes = require('./routes/user.routes')
const captainRoutes = require('./routes/captain.routes')

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(cors())

app.get('/',(req,res)=>{
    res.send("HELLO")
})
app.use('/users',userRoutes)
app.use('/captains',captainRoutes)

module.exports = app
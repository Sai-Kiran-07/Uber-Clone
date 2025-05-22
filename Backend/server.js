const http = require('http')
const app = require('./app')
const connectToDB = require('./db/db')
const port = process.env.PORT || 4000

const server = http.createServer(app)

connectToDB()

server.listen(port,()=>{
    console.log(`Server Listenong in ${port}`)
})
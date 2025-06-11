const http = require('http')
const app = require('./app')
const connectToDB = require('./db/db')
const port = process.env.PORT || 4000
const {initializeSocket} = require('./socket')

const server = http.createServer(app)

connectToDB()
initializeSocket(server)

server.listen(port,()=>{
    console.log(`Server Listenong in ${port}`)
})
import { createServer } from 'http'
import express from 'express'
import { Server } from 'socket.io'

const app = express()
const server = createServer(app)
const io = new Server(server, {
  cors: {
    origin: '*', // Настройте правильно для продакшена!
  },
})

app.get('/', (req, res) => {
  res.send(`Hello, It's server`)
})

io.on('connection', socket => {
  console.log('a user connected')
})

const PORT = process.env.PORT || 3009

server.listen(PORT, () => {
  console.log('listening on *:', PORT)
})

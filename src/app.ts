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

const messages = [
  { message: 'Ola Kate', id: 123321, user: { id: 123, name: 'Anna' } },
  { message: 'Ola Anna', id: 123322, user: { id: 321, name: 'Kate' } },
]

app.get('/', (req, res) => {
  res.send(`Hello, It's server`)
})

io.on('connection', socket => {
  console.log('a user connected')

  socket
    .on('client-message-was-sent', (message: string) => {
      console.log(message)
      let messageItem = {
        message: message,
        id: 123321 + new Date().getTime(),
        user: { id: 123, name: 'Anna' },
      }
      messages.push(messageItem)
      io.emit('new-message-sent', messageItem)
    })
    .emit('init-messages-was-published', messages)
})

const PORT = process.env.PORT || 3009

server.listen(PORT, () => {
  console.log('listening on *:', PORT)
})

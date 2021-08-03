import { Server } from 'socket.io'

export const io = new Server({
  cors: {
    origin: '*'
  }
})

export const startSocketIO = (server) => {
  io.attach(server)
  console.log('start socket')
}

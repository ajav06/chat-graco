import { io } from '@services/socket'

const users = []
const room = 'ROOM'

io.on('connection', (socket) => {
  console.log(`websocket with id: ${socket.id}`)

  //Join in Room
  socket.on('join', ({ username }, callback) => {
    //return users the room

    const user = users.find((user) => user.username === username)

    //Emit error
    if (user) {
      console.log(
        'Ya ese nombre de usuario esta registrado, por favor intente con otro.'
      )

      callback({
        error:
          'Ya ese nombre de usuario esta registrado, por favor intente con otro.'
      })
    } else {
      users.push({
        username,
        socket: socket.id
      })

      socket.join(room)

      callback({
        msg: 'Usuario añadido con éxito.'
      })

      io.to(room).emit('newUser', { username })
    }
  })

  socket.on('sendMessage', ({ username, message }) => {
    io.in(room).emit('receiveMessage', { username, message })
  })

  socket.on('userList', (value, callback) => {
    callback(users)
  })

  socket.on('disconnect', () => {
    const userD = users.find((user) => user.socket === socket.id)

    io.to(room).emit('disconnectUser', userD?.username)
  })
})

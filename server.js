const express = require('express')
const socket = require('socket.io')
const app = express()

app.use(express.static('public'))

const server = app.listen(3000, () => {
    console.log('Listening on port 3000.')
})

const io = socket(server)

io.on('connection', (socket) => {
    console.log('Made socket connection.', socket.id)

    socket.on('chat', (data) => {
        io.sockets.emit('chat', data)
    })

    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', data)
    }) 
})
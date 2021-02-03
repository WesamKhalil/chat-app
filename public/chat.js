const socket = io.connect(`http://localhost:3000/`)

const handle = document.getElementById('handle')
const message = document.getElementById('message')
const button = document.getElementById('send')
const output = document.getElementById('output')
const feedback = document.getElementById('feedback')

button.addEventListener('click', () => {
    socket.emit('chat', {
        handle: handle.value,
        message: message.value
    })
})

message.addEventListener('keypress', () => {
    socket.emit('typing', `${handle.value} is typing...`)
})

socket.on('chat', (data) => {
    const handleOutput = `<p class="handle">${data.handle}:</p>`
    const messageOutput = `<div class="message">${data.message}</div>`
    output.innerHTML += `<div class="message-container">${handleOutput} ${messageOutput}</div>`
    feedback.innerHTML = ''
})

socket.on('typing', (data) => {
    feedback.innerHTML = `<p class="typing">${data}</p>`
})
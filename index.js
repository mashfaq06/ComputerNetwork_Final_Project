const express = require('express')
const socket = require('socket.io')
const fs = require('fs')
const app = express()
const server = app.listen(3000, () => {
    console.log("listening to the port: 3000")
})

app.use(express.static('public'))

const io = socket(server)

io.on('connection', function (socket) {
    console.log('Hello there we are connected!!', socket.id)


})



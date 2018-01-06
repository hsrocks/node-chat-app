const path = require('path');
const socketIO = require('socket.io');
const express = require('express');
const http = require('http');
const app = express();
const publicPath =path.join(__dirname , '../public');
const port = process.env.PORT || 3000;
var server = http.createServer(app);
var io = socketIO(server);
app.use(express.static(publicPath));
io.on('connection',(socket)=>{
  console.log('New user connected');
  socket.on('disconnect',(socket)=>{
    console.log('User disconnected');
  })
})

server.listen(port,()=>{
  console.log('Application listening on port ', port);
})

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
io.on('connection',function(socket){
  console.log('New user connected');

  socket.on('createMessage',(newMessage)=>{
    console.log('Create message',newMessage);
    io.emit('newMessage',{
      from : newMessage.from,
      text : newMessage.text,
      CreatedAt : new Date().getTime()
    })
  });
  socket.on('disconnect',()=>{
    console.log('User disconnected');
  });
})

server.listen(port,()=>{
  console.log('Application listening on port ', port);
})

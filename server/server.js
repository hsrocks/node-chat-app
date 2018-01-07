const path = require('path');
const socketIO = require('socket.io');
const express = require('express');
const http = require('http');
const app = express();
const publicPath =path.join(__dirname , '../public');
const port = process.env.PORT || 3000;
var server = http.createServer(app);
var io = socketIO(server);
const {generateMessage} = require('./utils/message');
const {generateLocationMessage} = require('./utils/message');
app.use(express.static(publicPath));
io.on('connection',function(socket){
  console.log('New user connected');
  socket.emit('newMessage',generateMessage('admin','Hi Thanks for joining the chatroom'))
  socket.broadcast.emit('newMessage',generateMessage('admin','New user joined'))
  socket.on('createMessage',(message,callback)=>{
    console.log('Create message',message);
    io.emit('newMessage',generateMessage(message.from,message.text));
    callback('This is a server message');
  });

  socket.on('createLocationMessage',(coords,callback)=>{
    console.log('Create Location message',coords);
    io.emit('newLocationMessage',generateLocationMessage('Admin',coords.latitude,coords.longitude));
    callback();
  });

  socket.on('disconnect',()=>{
    console.log('User disconnected');
  });
})

server.listen(port,()=>{
  console.log('Application listening on port ', port);
})

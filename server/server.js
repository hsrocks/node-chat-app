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
const {isRealString} = require('./utils/validation.js')
app.use(express.static(publicPath));
io.on('connection',function(socket){
  console.log('New user connected');
  socket.on('join',(params,callback)=>{
    if(!isRealString(params.name) || !isRealString(params.room)){
      callback('Name and roomname are required');
    }
    socket.join(params.room);
    socket.emit('newMessage',generateMessage('admin','Hi Thanks for joining the chatroom'))
    socket.broadcast.to(params.room).emit('newMessage',generateMessage('admin',`${params.name} has joined.`))
    callback()
  })
  socket.on('createMessage',(message,callback)=>{
    console.log('Create message',message);
    io.emit('newMessage',generateMessage(message.from,message.text));
    callback();
  });

  socket.on('createLocationMessage',(coords,callback)=>{
    console.log('Create Location message',coords);
    io.emit('newLocationMessage',generateLocationMessage('Admin',coords.latitude,coords.longitude));
  });

  socket.on('disconnect',()=>{
    console.log('User disconnected');
  });
})

server.listen(port,()=>{
  console.log('Application listening on port ', port);
})

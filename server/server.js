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
const {Users} = require('./utils/users.js')
app.use(express.static(publicPath));
var users =  new Users();
io.on('connection',function(socket){
  console.log('New user connected');
  socket.on('join',(params,callback)=>{
    if(!isRealString(params.name) || !isRealString(params.room)){
      return callback('Name and roomname are required');
    }
    socket.join(params.room);
    // when user joins other room remove them from previous rooms
    users.removeUser(socket.id)
      users.addUser(socket.id , params.name , params.room);
    io.emit(params.room).emit('updateUserList',users.getUserList(params.room))

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
    var user = users.removeUser(socket.id)
    if(user){
      io.to(user.room).emit('updateUserList',users.getUserList(user.room))
      io.to(user.room).emit('newMessage',generateMessage('admin',`${user.name} has left.`))
    }
  });
})

server.listen(port,()=>{
  console.log('Application listening on port ', port);
})

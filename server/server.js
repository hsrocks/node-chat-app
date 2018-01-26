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
  io.emit('populate',users.getRoom());

  socket.on('join',(params,callback)=>{
    console.log(params.room);
    if(!isRealString(params.name) || !isRealString(params.room) || params.room === '---No Room Selected---'){
      return callback('Name and roomname are required');
    }
    var room = params.room.toLowerCase()
    socket.join(room);
    // when user joins other room remove them from previous rooms
    users.removeUser(socket.id)
    var usersNameList = users.getUserList(room);
    var user = usersNameList.filter((name)=>{
      return   name === params.name;
    })
    if(user.length>0){
      return callback("The user with the given name already exist")
    }
    users.addUser(socket.id , params.name , room);
    users.addRoom(room)
    io.emit(room).emit('updateUserList',users.getUserList(room))
    socket.emit('newMessage',generateMessage('admin','Hi Thanks for joining the chatroom'))
    socket.broadcast.to(room).emit('newMessage',generateMessage('admin',`${params.name} has joined.`))
    callback()
  })
  socket.on('createMessage',(message,callback)=>{
    var user = users.getUser(socket.id)
    if(user && isRealString(message.text)){
    var room = user.room.toLowerCase()
      io.to(room).emit('newMessage',generateMessage(user.name,message.text));
    }

    callback();
  });

  socket.on('createLocationMessage',(coords,callback)=>{
    var user = users.getUser(socket.id)
    if(user){
      var room = user.room.toLowerCase()
      io.to(room).emit('newLocationMessage',generateLocationMessage(user.name,coords.latitude,coords.longitude));
    }
  });

  socket.on('disconnect',()=>{
    var user = users.removeUser(socket.id)
    if(user){
      var room = user.room.toLowerCase()
      if(users.getUserList(room).length>0){
      io.to(room).emit('updateUserList',users.getUserList(room))
      io.to(room).emit('newMessage',generateMessage('admin',`${user.name} has left.`))
    }
    else{
    users.removeRoom(room);
    }
    }
  });
})

server.listen(port,()=>{
  console.log('Application listening on port ', port);
})

var socket = io();
socket.on('connect',function(){
  console.log('Connected to a server');
  socket.emit('createMessage',{
    to : 'me@eg.com',
    text : 'Hey me here'
  });
});
socket.on('disconnect',function(){
  console.log('Disconnected to a server');
})
socket.on('newMessage',function(message){
  console.log('New Message Recieved',message);
})

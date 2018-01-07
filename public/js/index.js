var socket = io();
socket.on('connect',function(){
  console.log('Connected to a server');

});
socket.on('disconnect',function(){
  console.log('Disconnected to a server');
})
socket.on('newMessage',function(message){
  console.log('New Message Recieved',message);
  var li = $('<li></li>');
  li.text(`${message.from} : ${message.text}`);
  $('#messages').append(li)
})

socket.emit('createMessage',{
  from : 'Frank',
  text : 'Hi'
},function(data){
  console.log('Ack Recieved',data);
})

$('#message-form').on('submit', function(event){
  // to override the default behaviour of form to refresh it every time we submit we use preventDefault
  event.preventDefault();
  socket.emit('createMessage',{
    from: 'User',
    text: $('[name=message]').val()
  },function(){
  })
})

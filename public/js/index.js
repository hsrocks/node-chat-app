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

socket.on('newLocationMessage',function(message){
  console.log('New Message Recieved',message);
  var li = $('<li></li>');
  var a = $('<a target="_blank">My current Location</a>')
  li.text(`${message.from} :`);
  a.attr('href',message.url)
  li.append(a);
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

var locationButton = $('#send-location');
locationButton.on('click',function(){
  if(!navigator.geolocation){
    return alert('Geolocation not supported by your user')
  }
  navigator.geolocation.getCurrentPosition(function(position){
    socket.emit('createLocationMessage',{
      latitude : position.coords.latitude,
      longitude : position.coords.longitude
    },function(){
    })
  }),function(){
    alert('Unable to fetch location')
  }
})
